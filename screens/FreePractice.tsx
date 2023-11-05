import React from 'react';
import {StyleSheet} from 'react-native';
import Container from './components/container';
import Title from './components/title';
import Button from './components/button';
import Main from './components/main';

const FreePractice = ({componentId}) => {
  return (
    <Container>
      <Main>
        <Title>Free practice</Title>
      </Main>
      <Button title="Start practice" onPress={() => {}} />
    </Container>
  );
};

export default FreePractice;
