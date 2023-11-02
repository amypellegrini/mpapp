import React from 'react';

import {View, Text, Pressable, StyleSheet} from 'react-native';

import Title from './components/title';
import Main from './components/main';
import Container from './components/container';

function PracticeSummary({entryTitle, duration}) {
  return (
    <Container>
      <Main>
        <View>
          <Title>Practice summary</Title>
        </View>
        <View>
          <Text>Well done!</Text>
          <Text>Entry title:</Text>
          <Text>{entryTitle}</Text>
          <Text>{duration}</Text>
        </View>
      </Main>
      <View>
        <Pressable>
          <Text>Reset</Text>
        </Pressable>
        <Pressable>
          <Text>Save entry</Text>
        </Pressable>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
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
