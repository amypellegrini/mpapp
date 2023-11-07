import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

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
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row-reverse',
          }}
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.PracticeMenu',
              },
            });
          }}>
          <Icon
            name="music-note"
            style={{marginLeft: 10, marginRight: 15}}
            size={30}
            color="#333333"
          />
        </Button>
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
        <Button
          title="Goals"
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.Goals',
              },
            });
          }}
        />

        <Button
          title="Practice journal"
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.PracticeJournal',
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
