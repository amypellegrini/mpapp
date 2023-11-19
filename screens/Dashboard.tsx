import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
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

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
}

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
                ? (totalPracticeTimeToday / dailyPracticeTimeGoal.seconds) * 100
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
            <Text style={[styles.h4, commonStyles.textCenter]}>
              {formatDuration(dailyPracticeTimeGoal.seconds)}
            </Text>
            {dailyPracticeTimeGoal && (
              <Text style={commonStyles.textCenter}>Daily target</Text>
            )}
          </View>
          <View style={[commonStyles.flex1]}>
            {practicedToday.length === 0 && (
              <Text style={[commonStyles.textCenter, styles.h4]}>
                Nothing yet!
              </Text>
            )}
            {practicedToday.length > 0 && (
              <Text style={[commonStyles.textCenter, styles.h4]}>
                {formatDuration(totalPracticeTimeToday)}
              </Text>
            )}
            <Text style={[commonStyles.textCenter]}>Played today</Text>
          </View>
          <View style={commonStyles.flex1}>
            {totalPracticeTimeToday < dailyPracticeTimeGoal?.seconds && (
              <Text style={[commonStyles.textCenter, styles.h4]}>
                {dailyPracticeTimeGoal &&
                  formatDuration(
                    dailyPracticeTimeGoal.seconds - totalPracticeTimeToday,
                  )}
              </Text>
            )}
            {totalPracticeTimeToday >= dailyPracticeTimeGoal?.seconds && (
              <Text style={[commonStyles.textCenter, styles.h4]}>
                Nothing, done!
              </Text>
            )}
            <Text style={[commonStyles.textCenter]}>Remaining</Text>
          </View>
        </View>

        <View style={commonStyles.mb30}>
          <Text style={styles.h4}>Total practice time:</Text>
          {totalTime === 0 && <Text>You haven't practiced anything yet!</Text>}
          {totalTime > 0 && (
            <Text>
              {formatDuration(totalTime)} since{' '}
              {oldestSummaryEntry && formatDate(oldestSummaryEntry.createdAt)}
            </Text>
          )}
        </View>

        {topBpm > 0 && (
          <>
            <Text
              style={[
                commonStyles.h2,
                commonStyles.mb20,
                commonStyles.underline,
              ]}>
              BPM metrics
            </Text>
            <View style={[commonStyles.mb20, {flexDirection: 'row'}]}>
              <View style={commonStyles.flex1}>
                <Text style={[styles.h4]}>{topBpm} bpm</Text>
                <Text>Top</Text>
              </View>
              <View style={commonStyles.flex1}>
                <Text style={[styles.h4]}>{lowestBpm} bpm</Text>
                <Text>Lowest</Text>
              </View>
              <View style={commonStyles.flex1}>
                <Text style={[styles.h4]}>{averageBpm} bpm</Text>
                <Text>Average</Text>
              </View>
            </View>
          </>
        )}
      </Main>
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

const styles = StyleSheet.create({
  entryItem: {
    borderRadius: 4,
    backgroundColor: '#DFDFDF',
    padding: 5,
    paddingLeft: 10,
    paddingBottom: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#666666',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: '#D11111',
    borderColor: '#B11111',
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    marginLeft: 5,
    width: 30,
    height: 30,
  },
  deleteButtonText: {
    fontFamily: 'Arial',
    textAlign: 'center',
    color: '#FAFAFA',
    fontWeight: '700',
    fontSize: 20,
    marginTop: -8,
  },
  entryItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  entryItemText: {
    color: '#111111',
  },
  h4: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EFEFEF',
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  menuButtonText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    height: 20,
  },
  menuButton: {
    paddingTop: 5,
    margin: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Dashboard;
