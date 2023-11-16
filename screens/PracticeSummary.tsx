import React, {useEffect, useState} from 'react';
import Realm from 'realm';

import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  useColorScheme,
} from 'react-native';

import Title from './components/title';
import Main from './components/main';
import Container from './components/container';
import {ButtonLeft, ButtonRight} from './components/button/Button';
import {Navigation, NavigationProps} from 'react-native-navigation';

import {useQuery, useRealm} from '@realm/react';

import RealmProviderWrapper, {
  PracticeEntrySummary,
} from './RealmProviderWrapper';
import formatDuration from './components/utils/formatDuration';
import commonStyles from './components/commonStyles';

interface PracticeSummaryProps extends NavigationProps {
  entryTitle: string;
  duration: number;
  bpm?: number;
}

function PracticeSummaryContent({
  entryTitle,
  duration,
  componentId,
  bpm,
}: PracticeSummaryProps) {
  const realm = useRealm();
  const isDarkMode = useColorScheme() === 'dark';

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
          <View style={commonStyles.mb10}>
            <Text
              style={[
                commonStyles.h4,
                {color: isDarkMode ? '#EFEFEF' : '#202020'},
              ]}>
              Well done!
            </Text>
            <Text
              style={[
                commonStyles.h6,
                {color: isDarkMode ? '#EFEFEF' : '#202020'},
              ]}>
              Entry details:
            </Text>
            <Text>{entryTitle}</Text>
            <Text>{formatDuration(duration)}</Text>
            {bpm && <Text>{bpm} bpm</Text>}
          </View>

          {entrySummary && (
            <View style={commonStyles.mb10}>
              <Text
                style={[
                  commonStyles.h6,
                  {color: isDarkMode ? '#EFEFEF' : '#202020'},
                ]}>
                Total practice time:
              </Text>
              <Text>
                {formatDuration(computedTotalTime)} since{' '}
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
                entrySummary.updatedAt = date;
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
                bpm: bpm,
              });
            });

            Navigation.popToRoot(componentId);
          }}
        />
      </View>
    </Container>
  );
}

function PracticeSummary(props: PracticeSummaryProps) {
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
});

export default PracticeSummary;
