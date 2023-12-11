import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {useQuery} from '@realm/react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import RealmProviderWrapper, {
  DailyPracticeTimeGoal,
  PracticeEntry,
  PracticeEntrySummary,
} from './RealmProviderWrapper';
import Container from './components/container';
import Title from './components/title';
import Main from './components/main';
import formatDuration from './components/utils/formatDuration';
import commonStyles from './components/commonStyles';
import formatTime from './components/utils/formatTime';
import {NavigationProps} from 'react-native-navigation';
import Menu from './components/menu';
import Button from './components/button';

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
}

type DataEntry = {
  [key: string]: any;
};

const convertToCSV = (data: Realm.Collection<PracticeEntry>) => {
  const plainArray: DataEntry[] = Array.from(data).map(obj =>
    Object.assign({}, obj),
  );

  const headers = Object.keys(plainArray[0]);
  const csvData = [];

  csvData.push(headers.join(','));

  plainArray.forEach(row => {
    csvData.push(headers.map(header => JSON.stringify(row[header] || '')));
  });

  return csvData.join('\n');
};

function DashboardContent({componentId}: NavigationProps) {
  const summaryEntries = useQuery<PracticeEntrySummary>('PracticeEntrySummary');
  const entries = useQuery<PracticeEntry>('PracticeEntry');

  const dailyPracticeTimeGoal = useQuery<DailyPracticeTimeGoal>(
    'DailyPracticeTimeGoal',
  )[0];

  let lowestBpm = 1000;
  let topBpm = 0;
  let bpmSum = 0;
  let bpmItems = 0;

  const practicedToday = entries.filter(entry => {
    const today = new Date();

    if (entry.bpm) {
      if (entry.bpm > topBpm) {
        topBpm = entry.bpm;
      }

      if (entry.bpm < lowestBpm) {
        lowestBpm = entry.bpm;
      }

      bpmItems++;
      bpmSum += entry.bpm;
    }

    return (
      entry.createdAt.getDate() === today.getDate() &&
      entry.createdAt.getMonth() === today.getMonth() &&
      entry.createdAt.getFullYear() === today.getFullYear()
    );
  });

  const practicedLastWeek = entries
    .filter(entry => {
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      return entry.createdAt > lastWeek;
    })
    .reduce((total, entry) => {
      return total + entry.duration;
    }, 0);

  const practicedLastMonth = entries
    .filter(entry => {
      const today = new Date();
      const lastMonth = new Date();
      lastMonth.setDate(today.getDate() - 30);

      return entry.createdAt > lastMonth;
    })
    .reduce((total, entry) => {
      return total + entry.duration;
    }, 0);

  const averageBpm = Math.round(bpmSum / bpmItems);

  const totalTime = summaryEntries.reduce((total, entry) => {
    return total + entry.totalDuration;
  }, 0);

  const oldestSummaryEntry = summaryEntries.sorted('createdAt')[0];

  const totalPracticeTimeToday = practicedToday.reduce((total, entry) => {
    return total + entry.duration;
  }, 0);

  return (
    <Container>
      <ScrollView>
        <Main>
          <Title>Dashboard</Title>

          <View style={[commonStyles.mAuto, commonStyles.mb20]}>
            <AnimatedCircularProgress
              delay={200}
              duration={500}
              lineCap="round"
              rotation={180}
              size={180}
              width={12}
              fill={
                dailyPracticeTimeGoal
                  ? (totalPracticeTimeToday / dailyPracticeTimeGoal.seconds) *
                    100
                  : 0
              }
              tintColor="#00ee00"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#3d5875">
              {fill => (
                <Text style={{fontSize: 32}}>
                  {formatTime(totalPracticeTimeToday)}
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 30,
            }}>
            <View style={commonStyles.flex1}>
              <Text style={[commonStyles.dl, commonStyles.textCenter]}>
                {formatDuration(dailyPracticeTimeGoal.seconds)}
              </Text>
              {dailyPracticeTimeGoal && (
                <Text style={commonStyles.textCenter}>Daily target</Text>
              )}
            </View>
            <View style={[commonStyles.flex1]}>
              {practicedToday.length === 0 && (
                <Text style={[commonStyles.textCenter, commonStyles.dl]}>
                  Nothing yet
                </Text>
              )}
              {practicedToday.length > 0 && (
                <Text style={[commonStyles.textCenter, commonStyles.dl]}>
                  {formatDuration(totalPracticeTimeToday)}
                </Text>
              )}
              <Text style={[commonStyles.textCenter]}>Played today</Text>
            </View>
            <View style={commonStyles.flex1}>
              {totalPracticeTimeToday < dailyPracticeTimeGoal?.seconds && (
                <Text style={[commonStyles.textCenter, commonStyles.dl]}>
                  {dailyPracticeTimeGoal &&
                    formatDuration(
                      dailyPracticeTimeGoal.seconds - totalPracticeTimeToday,
                    )}
                </Text>
              )}
              {totalPracticeTimeToday >= dailyPracticeTimeGoal?.seconds && (
                <Text style={[commonStyles.textCenter, commonStyles.dl]}>
                  Nothing, done!
                </Text>
              )}
              <Text style={[commonStyles.textCenter]}>Remaining</Text>
            </View>
          </View>

          <View style={[commonStyles.card]}>
            <Text style={[commonStyles.h2, commonStyles.underline]}>
              Total practice time
            </Text>
            <Text
              style={[
                commonStyles.mb20,
                {
                  fontStyle: 'italic',
                },
              ]}>
              Since{' '}
              {oldestSummaryEntry && formatDate(oldestSummaryEntry.createdAt)}
            </Text>
            {totalTime === 0 && (
              <Text>You haven't practiced anything yet!</Text>
            )}
            {totalTime > 0 && (
              <View style={[commonStyles.flexRow]}>
                <View style={[commonStyles.flex1]}>
                  <Text style={commonStyles.dl}>
                    {formatDuration(totalTime)}
                  </Text>
                  <Text>Total</Text>
                </View>
                <View style={[commonStyles.flex1]}>
                  <Text style={commonStyles.dl}>
                    {formatDuration(practicedLastWeek)}
                  </Text>
                  <Text>Last week</Text>
                </View>
                <View style={[commonStyles.flex1]}>
                  <Text style={commonStyles.dl}>
                    {formatDuration(practicedLastMonth)}
                  </Text>
                  <Text>Last month</Text>
                </View>
              </View>
            )}
          </View>

          {topBpm > 0 && (
            <View style={commonStyles.card}>
              <Text
                style={[
                  commonStyles.h2,
                  commonStyles.mb20,
                  commonStyles.underline,
                ]}>
                BPM metrics
              </Text>
              <View style={[{flexDirection: 'row'}]}>
                <View style={commonStyles.flex1}>
                  <Text style={[commonStyles.dl]}>{topBpm} bpm</Text>
                  <Text>Top</Text>
                </View>
                <View style={commonStyles.flex1}>
                  <Text style={[commonStyles.dl]}>{lowestBpm} bpm</Text>
                  <Text>Lowest</Text>
                </View>
                <View style={commonStyles.flex1}>
                  <Text style={[commonStyles.dl]}>{averageBpm} bpm</Text>
                  <Text>Average</Text>
                </View>
              </View>
            </View>
          )}
          <Button
            title="Export data"
            onPress={() => {
              const data = convertToCSV(
                entries as Realm.Collection<PracticeEntry>,
              );

              const path = `${RNFS.DocumentDirectoryPath}/exported_data.csv`;

              RNFS.writeFile(path, data, 'utf8')
                .then(success => {
                  console.log('File exported successfully!');
                })
                .catch(error => {
                  console.error('Error exporting CSV:', error.message);
                });

              Share.open({
                url: `file://${path}`,
                type: 'text/csv',
                title: 'Exported data',
              }).catch(err => {
                console.error('Error sharing CSV:', err.message);
              });
            }}
          />
          <Button title="Import data" onPress={() => {}} />
        </Main>
      </ScrollView>
      <Menu componentId={componentId} />
    </Container>
  );
}

const Dashboard = (props: NavigationProps) => {
  return (
    <RealmProviderWrapper>
      <DashboardContent {...props} />
    </RealmProviderWrapper>
  );
};

export default Dashboard;
