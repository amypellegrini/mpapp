import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text} from 'react-native';
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
          <MaterialCommunityIcon
            style={commonStyles.mAuto}
            name="playlist-music"
            color="#333333"
            size={50}
          />
          <Text
            style={[
              {
                color: '#111111',
              },
              commonStyles.textCenter,
              commonStyles.mb10,
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
          <MaterialCommunityIcon
            style={commonStyles.mAuto}
            name="music"
            color="#333333"
            size={50}
          />
          <Text
            style={[
              {
                color: '#111111',
              },
              commonStyles.textCenter,
              commonStyles.mb10,
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
