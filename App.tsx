import React from 'react';

import Welcome from './screens/Welcome';
import {NavigationProps} from 'react-native-navigation';

function App(props: NavigationProps): JSX.Element {
  return <Welcome {...props} />;
}

export default App;
