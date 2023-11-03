/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import App from './App';
import Practice from './screens/Practice';
import PracticeSummary from './screens/PracticeSummary';

Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.registerComponent('com.myApp.Practice', () => Practice);
Navigation.registerComponent(
  'com.myApp.PracticeSummary',
  () => PracticeSummary,
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      animate: false,
    },
    hardwareBackButton: {
      dismissModalOnPress: false,
      popStackOnPress: false,
    },
  });
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.myApp.WelcomeScreen',
            },
          },
        ],
      },
    },
  });
});
