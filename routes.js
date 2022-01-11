import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Loading from './src/Pages/Loading';
import Main from './src/Pages/Main';
import Welcome from './src/Pages/Welcome';
import NewEntry from './src/Pages/NewEntry';
import Report from './src/Pages/Report';

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Loading,
      Welcome,
      Main,
      NewEntry,
      Report,
    },
    {
      initialRouteName: 'Loading',
      backBehavior: 'history',
    },
  ),
);

export default Routes;
