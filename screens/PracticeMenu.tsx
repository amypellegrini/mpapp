import React from 'react';
import {StyleSheet} from 'react-native';
import Container from './components/container';
import Title from './components/title';
import Button from './components/button';
import {Navigation} from 'react-native-navigation';
import Main from './components/main';

const PracticeMenu = ({componentId}) => {
  return (
    <Container>
      <Main>
        <Title>The Music Pratice App</Title>
        <Button
          title="Detailed practice"
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.PracticePreview',
              },
            });
          }}
        />
        <Button
          title="Free practice"
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.FreePractice',
              },
            });
          }}
        />
        <Button
          title="Practice schedule"
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.PracticeSchedule',
              },
            });
          }}
        />
      </Main>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default PracticeMenu;