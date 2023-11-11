import React from 'react';
import {Text} from 'react-native';
import commonStyles from '../commonStyles';
import {ReactNode} from 'react';

function H2({children}: {children: ReactNode}) {
  return <Text style={[commonStyles.h2]}>{children}</Text>;
}

export default H2;
