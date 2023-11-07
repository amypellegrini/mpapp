import 'react-native-get-random-values';

import React, {useEffect, useState} from 'react';
import Realm from 'realm';

import {View, Text, StyleSheet, BackHandler} from 'react-native';

import Title from './components/title';
import Main from './components/main';
import Container from './components/container';
import {ButtonLeft, ButtonRight} from './components/button/Button';
import {Navigation} from 'react-native-navigation';

import {useQuery, useRealm} from '@realm/react';

import RealmProviderWrapper, {
  PracticeEntrySummary,
} from './RealmProviderWrapper';

function PracticeSummaryContent({entryTitle, duration, componentId}) {
  const realm = useRealm();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Navigation.popToRoot(componentId);
        return true;
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const entrySummary = useQuery<PracticeEntrySummary>(
    'PracticeEntrySummary',
  ).filtered(`title = "${entryTitle}"`)[0];

  const [computedTotalTime] = useState(
    duration + (entrySummary ? entrySummary.totalDuration : 0),
  );

  return (
    <Container>
      <Main>
        <View>
          <Title>Practice summary</Title>
        </View>
        <View>
          <View style={styles.mb10}>
            <Text style={styles.h4}>Well done!</Text>
            <Text style={styles.h6}>Entry details:</Text>
            <Text>{entryTitle}</Text>
            <Text>{duration}</Text>
          </View>

          {entrySummary && (
            <View style={styles.mb10}>
              <Text style={styles.h6}>Total practice time:</Text>
              <Text>
                {computedTotalTime} since{' '}
                {entrySummary.createdAt.toLocaleString()}
              </Text>
            </View>
          )}
        </View>
      </Main>
      <View style={styles.footer}>
        <ButtonLeft title="Reset" onPress={() => {}} />
        <ButtonRight
          title="Save entry"
          onPress={() => {
            realm.write(() => {
              const date = new Date();

              if (entrySummary) {
                entrySummary.totalDuration += duration;
              } else {
                realm.create('PracticeEntrySummary', {
                  title: entryTitle,
                  totalDuration: duration,
                  _id: new Realm.BSON.ObjectId(),
                  createdAt: date,
                  updatedAt: date,
                });
              }

              realm.create('PracticeEntry', {
                title: entryTitle,
                duration: duration,
                _id: new Realm.BSON.ObjectId(),
                createdAt: date,
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
  entryTitle: {},
  h4: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EFEFEF',
    marginBottom: 5,
  },
  h6: {
    color: '#EFEFEF',
    fontWeight: 'bold',
  },
  mb10: {
    marginBottom: 10,
  },
});

export default PracticeSummary;
