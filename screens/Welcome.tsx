import React from 'react';
import {StyleSheet} from 'react-native';
import Container from './components/container';
import Title from './components/title';
import Button from './components/button';
import {Navigation} from 'react-native-navigation';
import Main from './components/main';

const Welcome = ({componentId}) => {
  return (
    <Container>
      <Main>
        <Title>The Music Pratice App</Title>
        <Button
          title="Practice"
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.PracticePreview',
              },
            });
          }}
        />
        <Button
          title="Dashboard"
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.Dashboard',
              },
            });
          }}
        />
      </Main>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Welcome;
