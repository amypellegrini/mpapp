/**
 * @format
 */

import 'react-native-get-random-values';
import {Navigation} from 'react-native-navigation';
import App from './App';
import Practice from './screens/Practice';
import PracticeSummary from './screens/PracticeSummary';
import PracticePreview from './screens/PrecticePreview';
import Dashboard from './screens/Dashboard';

Navigation.registerComponent('com.myApp.Welcome', () => App);
Navigation.registerComponent('com.myApp.Dashboard', () => Dashboard);
Navigation.registerComponent(
  'com.myApp.PracticePreview',
  () => PracticePreview,
);
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
  });
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.myApp.Welcome',
            },
          },
        ],
      },
    },
  });
});
