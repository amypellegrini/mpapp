import React from 'react';
import Realm from 'realm';

import {View, Text, StyleSheet} from 'react-native';

import Title from './components/title';
import Main from './components/main';
import Container from './components/container';
import {ButtonLeft, ButtonRight} from './components/button/Button';
import {Navigation} from 'react-native-navigation';

import {useRealm} from '@realm/react';

import RealmProviderWrapper from './RealmProviderWrapper';

function PracticeSummaryContent({entryTitle, duration, componentId}) {
  const realm = useRealm();

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
      <View style={styles.footer}>
        <ButtonLeft title="Reset" onPress={() => {}} />
        <ButtonRight
          title="Save entry"
          onPress={() => {
            realm.write(() => {
              realm.create('PracticeEntry', {
                title: entryTitle,
                duration: duration,
                _id: new Realm.BSON.ObjectId(),
              });
            });

            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.Welcome',
              },
            });
          }}
        />
      </View>
    </Container>
  );
}

function PracticeSummary(props) {
  return (
    <RealmProviderWrapper>
      <PracticeSummaryContent {...props} />
    </RealmProviderWrapper>
  );
}

const styles = StyleSheet.create({
  header: {},
  body: {},
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  button: {},
  buttonLeft: {},
  buttonRight: {},
  buttonLabel: {},
  entryTitle: {},
  timeDisplay: {},
});

export default PracticeSummary;
