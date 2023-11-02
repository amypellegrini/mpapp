import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Title from './components/title';

function PracticeSummary({entryTitle, duration}) {
  return (
    <View style={styles.container}>
      <View>
        <Title>Practice summary</Title>
      </View>
      <View>
        <Text>Well done!</Text>
        <Text>Entry title:</Text>
        <Text>{entryTitle}</Text>
        <Text>{duration}</Text>
      </View>
      <View>
        <Pressable>
          <Text>Reset</Text>
        </Pressable>
        <Pressable>
          <Text>Save entry</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {},
  body: {},
  footer: {},
  button: {},
  buttonLeft: {},
  buttonRight: {},
  buttonLabel: {},
  entryTitle: {},
  timeDisplay: {},
});

export default PracticeSummary;
