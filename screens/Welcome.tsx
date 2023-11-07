import 'react-native-get-random-values';

import React from 'react';
import {StyleSheet} from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
          style={styles.iconButton}
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.PracticeMenu',
              },
            });
          }}>
          <FontistoIcon
            name="music-note"
            style={styles.icon}
            size={30}
            color="#333333"
          />
        </Button>
        <Button
          style={styles.iconButton}
          title="Dashboard"
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.Dashboard',
              },
            });
          }}>
          <IoniconsIcon
            style={styles.icon}
            name="stats-chart"
            color="#333333"
            size={26}
          />
        </Button>
        <Button
          style={styles.iconButton}
          title="Goals"
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.Goals',
              },
            });
          }}>
          <FoundationIcon
            style={styles.icon}
            name="target"
            color="#333333"
            size={32}
          />
        </Button>

        <Button
          style={styles.iconButton}
          title="Practice journal"
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.PracticeJournal',
              },
            });
          }}>
          <MaterialCommunityIcon
            style={styles.icon}
            // name="book-open-page-variant"
            // name="file-document-edit-outline"
            name="book-music-outline"
            color="#333333"
            size={30}
          />
        </Button>
      </Main>
    </Container>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
    marginRight: 10,
    width: 30,
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
  },
});

export default Welcome;
