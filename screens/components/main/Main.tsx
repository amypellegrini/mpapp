import React from 'react';
import {View, StyleSheet} from 'react-native';

type MainProps = {
  children: React.ReactNode;
};

const Main = ({children}: MainProps) => {
  return <View style={styles.main}>{children}</View>;
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default Main;
