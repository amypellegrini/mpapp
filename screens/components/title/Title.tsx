import React from 'react';
import {Text, StyleSheet, useColorScheme} from 'react-native';

const Title = ({style = {}, children}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const stylesArray = Array.isArray(style) ? style : [style];
  const resolvedStyles = stylesArray.map(style =>
    typeof style === 'function' ? style({pressed: false}) : style,
  );

  return (
    <Text
      style={[
        styles.title,
        {
          color: isDarkMode ? '#EFEFEF' : '#202020',
        },
        ...resolvedStyles,
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#EFEFEF',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
});

export default Title;
