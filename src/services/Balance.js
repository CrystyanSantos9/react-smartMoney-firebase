import {getRealm} from './Realm';
import {getUUID} from './UUID';
import firestore from '@react-native-firebase/firestore';

import _ from 'lodash';
import moment from '../vendors/moment';
import Colors from '../styles/Color';

//recebe o valor de dias que serão considerados
export const getBalance = async (untilDays = 0) => {
  let querySnapshot;

  //se alguém passar um valor no campo de dias
  if (untilDays > 0) {
    const date = moment().subtract(untilDays, 'days').toDate();
    querySnapshot = await firestore()
      .collection('entries')
      .orderBy('entryAt')
      .endBefore(date)
      .get();
  } else {
    querySnapshot = await firestore().collection('entries').get();
  }

  return _(querySnapshot.docs).reduce((total, doc) => {
    return total + doc.data().amount;
  }, 0);
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

export const getBalanceSumByCategory = async (days, showOthers = true) => {
  const realm = await getRealm();
  //carrega todos os valores do banco
  let entries = realm.objects('Entry');
  //verifica se os dias foram escolhidos
  if (days > 0) {
    //diminui o valor de dias passado da data atual
    const date = moment().subtract(days, 'days').toDate();
    //retorna somente os valores a partir da data calculada dataAtual - dias
    entries = entries.filtered('entryAt >=$0', date);
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

  const othersLimits = 3;
  //Aqui informamos que showOthers = o agrupamento, somente
  //se tivermos chegado ao limite de categorias que devem ser exibidas = 3
  //e se showOthers existir = true

  //pegamos o valor de categorias agrupadas pelo lodash,
  //e se tivermos mais categorias que o limite
  if (showOthers && _(entries).size() > othersLimits) {
    //vamos fatiar o nosso array original para ir somente até o limite que queremos = 3
    const data1 = _(entries).slice(0, othersLimits); //nos retorna 4 objetos de categories

    //como não temos uma categoria outros, nós temos que criá-la
    const data2 = [
      {
        category: {id: getUUID(), name: 'Outros', color: Colors.metal},
        //aqui nós vamos pegar o valor amount de todas as outras categorias
        //utilizando novamente o slice, para mapearmos somente as categorias após
        //as 4 categorias retornadas anteriormente
        // slice retorna somente categorias > 3, logo 4... a N = última categoria do array
        amount: _(entries)
          .slice(othersLimits)
          .map(({amount}) => amount)
          .sum(),
      },
    ];

    entries = [...data1, ...data2];
  }

  console.log('getBalanceSumbyCategory :: ', JSON.stringify(entries));

  return entries;
};
