import React from 'react';

import Dashboard from './screens/Dashboard';
import {NavigationProps} from 'react-native-navigation';

function App(props: NavigationProps): JSX.Element {
  return <Dashboard {...props} />;
}

export default App;
