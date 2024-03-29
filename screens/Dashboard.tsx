import React from 'react';
import Realm from 'realm';
import {View, Text, ScrollView} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {useQuery, useRealm} from '@realm/react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import RealmProviderWrapper, {
  Completed,
  DailyPracticeTimeGoal,
  PracticeEntry,
  PracticeEntrySummary,
  Skipped,
} from './RealmProviderWrapper';
import Container from './components/container';
import Title from './components/title';
import Main from './components/main';
import formatDuration from './components/utils/formatDuration';
import commonStyles from './components/commonStyles';
import formatTime from './components/utils/formatTime';
import {
  Navigation,
  NavigationProps,
  OptionsModalPresentationStyle,
  OptionsModalTransitionStyle,
} from 'react-native-navigation';
import Menu from './components/menu';
import Button from './components/button';
import {ButtonText} from './components/button/Button';
import getPracticeScore from './utils/getPracticeScore';
import formatDate from './utils/formatDate';

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

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function DashboardContent({componentId}: NavigationProps) {
  const realm = useRealm();
  const summaryEntries = useQuery<PracticeEntrySummary>('PracticeEntrySummary');
  const entries = useQuery<PracticeEntry>('PracticeEntry');

  const dailyPracticeTimeGoal = useQuery<DailyPracticeTimeGoal>(
    'DailyPracticeTimeGoal',
  )[0];

  const skipped = useQuery<Skipped>('Skipped')[0];
  const completed = useQuery<Completed>('Completed')[0];

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

  const original = summaryEntries.sorted('createdAt')[0];
  const oldestSummaryEntry = original
    ? JSON.parse(JSON.stringify(original))
    : null;

  const totalPracticeTimeToday = practicedToday.reduce((total, entry) => {
    return total + entry.duration;
  }, 0);

  const displayDailyPracticeTimeGoal =
    dailyPracticeTimeGoal && dailyPracticeTimeGoal.seconds > 0;

  let praciceRecommendation = summaryEntries[0];

  summaryEntries.forEach(entry => {
    if (skipped && skipped.entryTitles[entry.title.replace(/\./g, '')]) {
      return;
    }

    if (completed && completed.entryTitles[entry.title.replace(/\./g, '')]) {
      return;
    }

    if (entry.practiceScore < praciceRecommendation.practiceScore) {
      praciceRecommendation = entry;
    }
  });

  praciceRecommendation = praciceRecommendation
    ? JSON.parse(JSON.stringify(praciceRecommendation))
    : null;

  if (skipped && !isToday(skipped.lastUpdated)) {
    realm.write(() => {
      skipped.entryTitles = {};
    });
  }

  return (
    <Container>
      <ScrollView>
        <Main>
          <Title>Dashboard</Title>
          <Text style={[commonStyles.h2, commonStyles.mb20]}>
            Daily practice
          </Text>
          {displayDailyPracticeTimeGoal && (
            <>
              <View style={[commonStyles.mAuto, commonStyles.mb20]}>
                <AnimatedCircularProgress
                  delay={200}
                  duration={500}
                  lineCap="round"
                  rotation={180}
                  size={180}
                  width={8}
                  fill={
                    dailyPracticeTimeGoal
                      ? (totalPracticeTimeToday /
                          dailyPracticeTimeGoal.seconds +
                          0.001) *
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
                      -
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

          {!displayDailyPracticeTimeGoal && (
            <View style={[commonStyles.mb20]}>
              <View style={[commonStyles.mb20]}>
                <Text>You don't have a daily practice time goal set.</Text>
                <Text>Set a daily practice time goal to get started!</Text>
              </View>
              <Button
                title="Set goal"
                style={[
                  commonStyles.flexRowReverse,
                  commonStyles.justifyCenter,
                  commonStyles.alignCenter,
                ]}
                onPress={() => {
                  Navigation.showModal({
                    stack: {
                      children: [
                        {
                          component: {
                            name: 'com.myApp.GoalsModal',
                            options: {
                              modalTransitionStyle:
                                OptionsModalTransitionStyle.coverVertical,
                              modalPresentationStyle:
                                OptionsModalPresentationStyle.overCurrentContext,
                            },
                          },
                        },
                      ],
                    },
                  });
                }}>
                <MaterialCommunityIcon
                  style={[commonStyles.mr10]}
                  name="timer-outline"
                  color="#333333"
                  size={50}
                />
              </Button>
            </View>
          )}

          {praciceRecommendation && (
            <View style={[commonStyles.mb20, commonStyles.card]}>
              <Text style={[commonStyles.h2]}>Practice recommendation</Text>
              <Text style={[commonStyles.fontItalic, commonStyles.mb20]}>
                Last played on{' '}
                {formatDate(new Date(praciceRecommendation.updatedAt))}
                {praciceRecommendation.bpm &&
                  ` at ${praciceRecommendation.bpm} bpm`}
              </Text>
              <Text style={[commonStyles.h3]}>
                {praciceRecommendation.title}
              </Text>
              <View
                style={[
                  commonStyles.flexRow,
                  commonStyles.mt20,
                  commonStyles.gap6,
                ]}>
                <Button
                  style={[commonStyles.flex1]}
                  title="Skip"
                  onPress={() => {
                    realm.write(() => {
                      if (skipped) {
                        skipped.lastUpdated = new Date();
                        skipped.entryTitles[
                          praciceRecommendation.title.replace(/\./g, '')
                        ] = praciceRecommendation.title;
                      } else {
                        realm.create('Skipped', {
                          lastUpdated: new Date(),
                          entryTitles: {
                            [praciceRecommendation.title.replace(/\./g, '')]:
                              praciceRecommendation.title,
                          },
                        });
                      }
                    });
                  }}
                />
                <Button
                  title="Completed"
                  style={[commonStyles.flex1]}
                  onPress={() => {
                    realm.write(() => {
                      if (completed) {
                        completed.entryTitles[
                          praciceRecommendation.title.replace(/\./g, '')
                        ] = praciceRecommendation.title;
                      } else {
                        realm.create('Completed', {
                          entryTitles: {
                            [praciceRecommendation.title.replace(/\./g, '')]:
                              praciceRecommendation.title,
                          },
                        });
                      }
                    });
                  }}
                />
              </View>
              <Button
                title="Practice now"
                onPress={() => {
                  Navigation.push(componentId, {
                    component: {
                      name: 'com.myApp.PracticePreview',
                      passProps: {
                        entryTitle: praciceRecommendation.title,
                        bpm: praciceRecommendation.bpm,
                      },
                    },
                  });
                }}
              />
            </View>
          )}

          <View style={[commonStyles.card]}>
            <Text style={[commonStyles.h2]}>Total practice time</Text>
            {oldestSummaryEntry && oldestSummaryEntry.createdAt && (
              <Text
                style={[
                  commonStyles.mb20,
                  {
                    fontStyle: 'italic',
                  },
                ]}>
                {oldestSummaryEntry.createdAt &&
                  `Since ${formatDate(new Date(oldestSummaryEntry.createdAt))}`}
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

          <View style={commonStyles.card}>
            <Text style={[commonStyles.h2]}>BPM metrics</Text>
            {bpmItems === 0 && (
              <Text style={[commonStyles.mt10]}>No data available.</Text>
            )}
            {topBpm > 0 && (
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
            )}
          </View>

          <View style={[commonStyles.card]}>
            <Text style={[commonStyles.h2]}>Recent practice entries</Text>
            {entries.length === 0 && (
              <Text style={commonStyles.mt10}>No data available.</Text>
            )}
            {entries.length > 0 &&
              entries
                .sorted('createdAt', true)
                .slice(0, 3)
                .map(entry => {
                  return (
                    <View
                      style={[
                        commonStyles.flexColumn,
                        commonStyles.justifyBetween,
                        commonStyles.gap6,
                        commonStyles.mt10,
                        {
                          borderTopWidth: 1,
                          borderTopColor: '#666666',
                          paddingBottom: 10,
                        },
                      ]}
                      key={entry._id.toString()}>
                      <Text>{entry.title}</Text>
                      <Text style={[commonStyles.fontItalic, {lineHeight: 15}]}>
                        {formatDuration(entry.duration)} -{' '}
                        {formatDate(entry.createdAt)}
                      </Text>
                    </View>
                  );
                })}
          </View>

          {entries.length === 0 && (
            <View style={[commonStyles.mb20]}>
              <Text style={[commonStyles.h3, commonStyles.mb10]}>
                You haven't practiced anything yet. You'll see some data once
                you start practicing with the app.
              </Text>
              <Button
                title="Start practicing"
                onPress={() => {
                  Navigation.push(componentId, {
                    component: {
                      name: 'com.myApp.PracticePreview',
                    },
                  });
                }}
              />
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
                  failOnCancel: false,
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
                          if (
                            entrySummary.updatedAt < new Date(entry.createdAt)
                          ) {
                            entrySummary.updatedAt = new Date(entry.createdAt);
                            entrySummary.bpm = entry.bpm
                              ? parseInt(entry.bpm)
                              : null;
                          } else {
                            entrySummary.createdAt = new Date(entry.createdAt);
                          }

                          entrySummary.totalDuration += parseInt(
                            entry.duration,
                          );
                          entrySummary.practiceScore = getPracticeScore(
                            entrySummary.updatedAt,
                            entrySummary.totalDuration,
                          );
                        } else {
                          const createdAt = new Date(entry.createdAt);
                          const totalDuration = parseInt(entry.duration);
                          const practiceScore = getPracticeScore(
                            createdAt,
                            totalDuration,
                          );

                          const realmEntrySummary = {
                            title: entry.title,
                            totalDuration: totalDuration,
                            _id: new Realm.BSON.ObjectId(),
                            createdAt: createdAt,
                            updatedAt: createdAt,
                            bpm: entry.bpm ? parseInt(entry.bpm) : null,
                            practiceScore: practiceScore,
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
      <Menu componentId={componentId} current="dashboard" />
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
