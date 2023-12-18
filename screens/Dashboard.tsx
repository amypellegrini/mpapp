import React from 'react';
import Realm from 'realm';
import {View, Text, ScrollView} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {useQuery, useRealm} from '@realm/react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import DocumentPicker from 'react-native-document-picker';

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
import {ButtonText} from './components/button/Button';

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
  const realm = useRealm();
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

          {dailyPracticeTimeGoal && (
            <>
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
                      ? (totalPracticeTimeToday /
                          dailyPracticeTimeGoal.seconds) *
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
                          dailyPracticeTimeGoal.seconds -
                            totalPracticeTimeToday,
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
            </>
          )}

          <View style={[commonStyles.card]}>
            <Text style={[commonStyles.h2]}>Total practice time</Text>
            {oldestSummaryEntry && (
              <Text
                style={[
                  commonStyles.mb20,
                  {
                    fontStyle: 'italic',
                  },
                ]}>
                Since {formatDate(oldestSummaryEntry.createdAt)}
              </Text>
            )}
            {totalTime === 0 && (
              <Text style={[commonStyles.mt10]}>
                You haven't practiced anything yet!
              </Text>
            )}
            {totalTime > 0 && (
              <View style={[commonStyles.flexRow]}>
                <View style={[commonStyles.flex1]}>
                  <Text style={commonStyles.dl}>
                    {formatDuration(totalTime).split(' ').slice(0, 2).join(' ')}
                  </Text>
                  <Text>Total</Text>
                </View>
                <View style={[commonStyles.flex1]}>
                  <Text style={commonStyles.dl}>
                    {formatDuration(practicedLastWeek)
                      .split(' ')
                      .slice(0, 2)
                      .join(' ')}
                  </Text>
                  <Text>Last week</Text>
                </View>
                <View style={[commonStyles.flex1]}>
                  <Text style={commonStyles.dl}>
                    {formatDuration(practicedLastMonth)
                      .split(' ')
                      .slice(0, 2)
                      .join(' ')}
                  </Text>
                  <Text>Last month</Text>
                </View>
              </View>
            )}
          </View>

          {topBpm > 0 && (
            <View style={commonStyles.card}>
              <Text style={[commonStyles.h2, commonStyles.mb20]}>
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
          <Text style={[commonStyles.h2]}>Your data</Text>
          <View
            style={[
              commonStyles.flexRow,
              commonStyles.justifyBetween,
              commonStyles.gap6,
              commonStyles.mb20,
            ]}>
            <Button
              title="Export data"
              style={[commonStyles.flex1]}
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
            <Button
              title="Import data"
              style={[commonStyles.flex1]}
              onPress={async () => {
                try {
                  const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.allFiles],
                  });

                  const content = await RNFS.readFile(res[0].uri, 'utf8');
                  const lines = content.split('\n');
                  const headers = lines[0]
                    .split(',')
                    .map(header => header.trim().replaceAll('"', ''));

                  const entries = lines.slice(1);

                  const parsedEntries = entries.map(entry => {
                    const values = entry.replaceAll('"', '').split(',');
                    const parsedEntry: DataEntry = {};

                    headers.forEach((header, index) => {
                      parsedEntry[header] = values[index];
                    });

                    return parsedEntry;
                  });

                  realm.write(() => {
                    parsedEntries.forEach(entry => {
                      if (entry.title && entry.duration && entry.createdAt) {
                        const entrySummary = summaryEntries.filtered(
                          `title = "${entry.title}"`,
                        )[0];

                        if (entrySummary) {
                          entrySummary.totalDuration += parseInt(
                            entry.duration,
                          );
                        } else {
                          const realmEntrySummary = {
                            title: entry.title,
                            totalDuration: parseInt(entry.duration),
                            _id: new Realm.BSON.ObjectId(),
                            createdAt: new Date(entry.createdAt),
                            updatedAt: new Date(entry.createdAt),
                            bpm: entry.bpm ? parseInt(entry.bpm) : null,
                          };

                          realm.create(
                            'PracticeEntrySummary',
                            realmEntrySummary,
                          );
                        }

                        const realmEntry = {
                          title: entry.title,
                          duration: parseInt(entry.duration),
                          _id: new Realm.BSON.ObjectId(),
                          createdAt: new Date(entry.createdAt),
                          bpm: entry.bpm ? parseInt(entry.bpm) : null,
                        };

                        realm.create('PracticeEntry', realmEntry);
                      }
                    });
                  });
                } catch (err) {
                  if (DocumentPicker.isCancel(err)) {
                    console.log('User canceled the file picker');
                  } else {
                    console.error('File Picker Error: ', err);
                  }
                }
              }}
            />
          </View>
          <Text style={[commonStyles.h2]}>Unsafe area</Text>
          <Button
            style={[commonStyles.error, commonStyles.errorBorder]}
            onPress={() => {
              realm.write(() => {
                realm.deleteAll();
              });
            }}>
            <ButtonText style={{color: '#ffffff'}}>Delete all data</ButtonText>
          </Button>
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
