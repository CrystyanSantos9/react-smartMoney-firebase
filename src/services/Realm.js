import Realm from 'realm';

import CategorySchema from '../schemas/CategorySchema';
import EntrySchema from '../schemas/EntrySchema';

import {getDefaultCategories} from './Categories';
import {cleanInitialized} from './Welcome';

export const getRealm = async () => {
  const realm = await Realm.open({
    schema: [CategorySchema, EntrySchema],
    schemaVersion: 2,
  });

  // dropDB(realm);
  //cleanInitialized()
  initDB(realm);
  return realm;
};

export const initDB = realm => {
  const categoriesLength = realm.objects('Category').length;
  console.log(`initDB :: categories length: ${categoriesLength}`);

  if (categoriesLength === 0) {
    const categories = getDefaultCategories();

    console.log('initDB :: initing db...');

    //inicia o salvamento das categorias no banco de dados
    try {
      realm.write(() => {
        categories.forEach(category => {
          console.log(
            `initDB :: creating category: ${JSON.stringify(category)}`,
          );

          //salva os dados no banco de dados
          realm.create('Category', category, true);
        });
      });
    } catch (error) {}
  } else {
    console.log('initDB :: categories already existing... Skypping.');
  }
};

export const dropDB = realm => {
  console.log('dropDB :: dropping db...');
  realm.write(() => {
    realm.deleteAll();
  });
};
