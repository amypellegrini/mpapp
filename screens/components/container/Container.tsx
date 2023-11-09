import React from 'react';
import {View, StyleSheet} from 'react-native';

const Container = ({style = {}, children}) => {
  const stylesArray = Array.isArray(style) ? style : [style];
  const resolvedStyles = stylesArray.map(style =>
    typeof style === 'function' ? style({pressed: false}) : style,
  );

  return <View style={[styles.container, ...resolvedStyles]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default Container;
