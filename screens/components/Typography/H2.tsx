import React from 'react';
import {Text, useColorScheme} from 'react-native';
import commonStyles from '../commonStyles';
import {ReactNode} from 'react';

function H2({children}: {children: ReactNode}) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text
      style={[
        commonStyles.h2,
        {
          color: isDarkMode ? '#EFEFEF' : '#202020',
        },
      ]}>
      {children}
    </Text>
  );
}

export default H2;
