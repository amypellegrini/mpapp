import React from 'react';
import Container from './components/container';
import Main from './components/main';
import Title from './components/title';
import Menu from './components/menu';
import {NavigationProps} from 'react-native-navigation';

function PracticeSchedule({componentId}: NavigationProps) {
  return (
    <Container>
      <Main>
        <Title>Daily plan</Title>
      </Main>
      <Menu componentId={componentId} />
    </Container>
  );
}

export default PracticeSchedule;
