import {getRealm} from './Realm';

import _ from 'lodash';
import moment from '../vendors/moment';

//recebe o valor de dias que serão considerados
export const getBalance = async (untilDays = 0) => {
  const realm = await getRealm();

  let entries = realm.objects('Entry');

  //se alguém passar um valor no campo de dias
  if (untilDays > 0) {
    const date = moment().subtract(untilDays, 'days').toDate();

    entries = entries.filtered('entryAt < $0', date);
  }

  return entries.sum('amount');
};

export const getBalanceSumByDate = async days => {
  const realm = await getRealm();

  const startBalance = (await getBalance(days)) || 0;

  let entries = realm.objects('Entry');

  if (days > 0) {
    const date = moment().subtract(days, 'days').toDate();

    //retornar valores a partir da data escolhida para a frente
    entries = entries.filtered('entryAt >= $0', date);
  }

  //retornar o valor agrupado por data e com o saldo acumulado por dia
  entries = _(entries)
    .groupBy(({entryAt}) => moment(entryAt).format('YYYYMMDD'))
    .map(entry => _.sumBy(entry, 'amount'))
    .map((amount, index, collection) => {
      return (
        (index === 0 ? startBalance : 0) +
        _.sum(_.slice(collection, 0, index)) +
        amount
      );
    });

  console.log('getBalanceSumbyDate :: ', JSON.stringify(entries));

  return entries;
};

export const getBalanceSumByCategory = async days => {
  const realm = await getRealm();

  //carrega todos os valores do banco
  let entries = realm.objects('Entry');

  //verifica se os dias foram escolhidos
  if (days > 0) {
    //diminui o valor de dias passado da data atual
    const date = moment().subtract(days, 'days').toDate();

    //retorna somente os valores a partir da data calculada dataAtual - dias
    entries = entries.filtered('entryAt >=$0, date');
  }

  //ordena os dados de forma crescente
  entries = entries.sorted('entryAt');

  entries = _(entries)
    .groupBy(({category: {id}}) => id)
    .map(entry => ({
      category: _.omit(entry[0].category, 'entries'),
      amount: Math.abs(_.sumBy(entry, 'amount')),
    }))
    .filter(({amount}) => amount > 0)
    .orderBy('amount', 'desc');

  console.log('getBalanceSumbyCategory :: ', JSON.stringify(entries));

  return entries;
};
