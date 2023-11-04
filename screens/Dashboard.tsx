import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRealm} from '@realm/react';
import RealmProviderWrapper, {PracticeEntry} from './RealmProviderWrapper';
import Container from './components/container';
import Title from './components/title';
import Main from './components/main';

function formatDuration(seconds: number): string {
  if (seconds === 0) {
    return '0s';
  }
  const time = {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
  let duration = '';

  if (time.hours) {
    duration += `${time.hours} hour${time.hours > 1 ? 's' : ''} `;
  }
  if (time.minutes) {
    duration += `${time.minutes} minute${time.minutes > 1 ? 's' : ''} `;
  }
  if (time.minutes && time.seconds) {
    duration += 'and ';
  }
  if (time.seconds) {
    duration += `${time.seconds} second${time.seconds > 1 ? 's' : ''}`;
  }
  return duration.trim();
}

function DashboardContent() {
  const realm = useRealm();
  const entries = realm.objects<PracticeEntry>('PracticeEntry');

  return (
    <Container>
      <Main>
        <Title>Dashboard</Title>
        <View>
          {entries.map(entry => (
            <View style={styles.entryItem} key={entry._id.toString()}>
              <Text style={[styles.entryItemTitle, styles.entryItemText]}>
                {entry.title}
              </Text>
              <Text style={styles.entryItemText}>
                {formatDuration(entry.duration)}
              </Text>
            </View>
          ))}
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
    padding: 10,
    paddingTop: 5,
    paddingBottom: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#666666',
  },
  entryItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  entryItemText: {
    color: '#111111',
  },
});

export default Dashboard;
