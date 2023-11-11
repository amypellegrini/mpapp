/**
 * @format
 */

import Realm from 'realm';
Realm.flags.THROW_ON_GLOBAL_REALM = true;
import 'react-native-get-random-values';
import {Navigation} from 'react-native-navigation';
import App from './App';
import Practice from './screens/Practice';
import PracticeSummary from './screens/PracticeSummary';
import PracticePreview from './screens/PracticePreview';
import PracticeJournal from './screens/PracticeJournal';
import PracticeMenu from './screens/PracticeMenu';
import Dashboard from './screens/Dashboard';
import Goals from './screens/Goals';
import DailyPlan from './screens/DailyPlan';
import FreePractice from './screens/FreePractice';
import EntrySummaryDetail from './screens/EntrySummaryDetail';
import GoalsModal from './screens/modals/GoalsModal';
import EntryFieldModal from './screens/modals/EntryFieldModal';

Navigation.registerComponent('com.myApp.Welcome', () => App);
Navigation.registerComponent('com.myApp.Dashboard', () => Dashboard);
Navigation.registerComponent('com.myApp.PracticeMenu', () => PracticeMenu);
Navigation.registerComponent(
  'com.myApp.EntrySummaryDetail',
  () => EntrySummaryDetail,
);
Navigation.registerComponent('com.myApp.FreePractice', () => FreePractice);
Navigation.registerComponent(
  'com.myApp.PracticePreview',
  () => PracticePreview,
);
Navigation.registerComponent('com.myApp.Practice', () => Practice);
Navigation.registerComponent(
  'com.myApp.PracticeSummary',
  () => PracticeSummary,
);
Navigation.registerComponent(
  'com.myApp.PracticeJournal',
  () => PracticeJournal,
);
Navigation.registerComponent('com.myApp.DailyPlan', () => DailyPlan);
Navigation.registerComponent('com.myApp.Goals', () => Goals);
Navigation.registerComponent('com.myApp.GoalsModal', () => GoalsModal);
Navigation.registerComponent(
  'com.myApp.EntryFieldModal',
  () => EntryFieldModal,
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
