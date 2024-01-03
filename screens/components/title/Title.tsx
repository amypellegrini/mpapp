import React from 'react';
import {Text, TextProps, StyleSheet, useColorScheme} from 'react-native';

interface TitleProps extends TextProps {}

const Title = ({style, children}: TitleProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const stylesArray = Array.isArray(style) ? style : [style];

  return (
    <Text
      style={[
        styles.title,
        {
          color: isDarkMode ? '#EFEFEF' : '#202020',
        },
        ...stylesArray,
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#EFEFEF',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
});

export default Title;
