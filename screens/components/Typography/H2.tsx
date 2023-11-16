import React from 'react';
import {Text, TextProps, useColorScheme} from 'react-native';
import commonStyles from '../commonStyles';
import {ReactNode} from 'react';

interface H2Props extends TextProps {}

function H2({style, children}: H2Props) {
  const isDarkMode = useColorScheme() === 'dark';

  const stylesArray = Array.isArray(style) ? style : [style];

  return (
    <Text
      style={[
        commonStyles.h2,
        {
          color: isDarkMode ? '#EFEFEF' : '#202020',
        },
        ...stylesArray,
      ]}>
      {children}
    </Text>
  );
}

export default H2;
