import React from 'react';
import {View, StyleSheet} from 'react-native';

interface ContainerProps extends React.ComponentProps<typeof View> {}

const Container = ({style, children}: ContainerProps) => {
  const stylesArray = Array.isArray(style) ? style : [style];

  return <View style={[styles.container, ...stylesArray]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default Container;
