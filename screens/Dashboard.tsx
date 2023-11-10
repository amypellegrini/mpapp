import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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

function DashboardContent() {
  const summaryEntries = useQuery<PracticeEntrySummary>('PracticeEntrySummary');
  const entries = useQuery<PracticeEntry>('PracticeEntry');

  const dailyPracticeTimeGoal = useQuery<DailyPracticeTimeGoal>(
    'DailyPracticeTimeGoal',
  )[0];

  const practicedToday = entries.filter(entry => {
    const today = new Date();
    return (
      entry.createdAt.getDate() === today.getDate() &&
      entry.createdAt.getMonth() === today.getMonth() &&
      entry.createdAt.getFullYear() === today.getFullYear()
    );
  });

  const totalTime = summaryEntries.reduce((total, entry) => {
    return total + entry.totalDuration;
  }, 0);

  const totalPracticeTimeToday = practicedToday.reduce((total, entry) => {
    return total + entry.duration;
  }, 0);

  console.log(practicedToday);

  return (
    <Container>
      <Main>
        <Title>Dashboard</Title>
        <View style={commonStyles.mb20}>
          <Text style={styles.h4}>Total practice time:</Text>
          {totalTime === 0 && <Text>You haven't practiced anything yet!</Text>}
          {totalTime > 0 && <Text>{formatDuration(totalTime)}</Text>}
        </View>
        <View style={commonStyles.mb20}>
          <Text style={styles.h4}>Daily practice target:</Text>
          {dailyPracticeTimeGoal && (
            <Text>{formatDuration(dailyPracticeTimeGoal.seconds)}</Text>
          )}
        </View>
        <View style={commonStyles.mb20}>
          <Text style={styles.h4}>Practiced today:</Text>
          {practicedToday.length === 0 && (
            <Text>You haven't practiced anything today!</Text>
          )}
          {practicedToday.length > 0 && (
            <Text>{formatDuration(totalPracticeTimeToday)}</Text>
          )}
        </View>

        <View>
          <AnimatedCircularProgress
            lineCap="round"
            rotation={180}
            size={100}
            width={10}
            fill={
              dailyPracticeTimeGoal
                ? (totalPracticeTimeToday / dailyPracticeTimeGoal.seconds) * 100
                : 0
            }
            tintColor="#00ee00"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875"
          />
        </View>
      </Main>
    </Container>
  );
}

const Dashboard = () => {
  return (
    <RealmProviderWrapper>
      <DashboardContent />
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
});

export default Dashboard;
