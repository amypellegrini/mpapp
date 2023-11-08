import React from 'react';
import {StyleSheet, Text, useColorScheme} from 'react-native';
import Container from './components/container';
import Title from './components/title';
import Button from './components/button';
import {Navigation} from 'react-native-navigation';
import Main from './components/main';
import commonStyles from './components/commonStyles';

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
          }}>
          <Text
            style={[
              {
                color: '#111111',
              },
              commonStyles.textCenter,
              commonStyles.mb30,
            ]}>
            Set tempo, key, time signature, etc.
          </Text>
        </Button>
        <Button
          title="Free practice"
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.FreePractice',
              },
            });
          }}>
          <Text
            style={[
              {
                color: '#111111',
              },
              commonStyles.textCenter,
              commonStyles.mb30,
            ]}>
            Just track my practice time.
          </Text>
        </Button>
      </Main>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default PracticeMenu;
