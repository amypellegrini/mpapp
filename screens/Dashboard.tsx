import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useRealm, useQuery} from '@realm/react';
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
  const entries = useQuery<PracticeEntry>('PracticeEntry');

  const totalTime = entries.reduce((total, entry) => {
    return total + entry.duration;
  }, 0);

  return (
    <Container>
      <Main>
        <Title>Dashboard</Title>
        {entries.length > 0 && (
          <View style={styles.mb10}>
            {entries.map(entry => (
              <View style={styles.entryItem} key={entry._id.toString()}>
                <View>
                  <Text style={[styles.entryItemTitle, styles.entryItemText]}>
                    {entry.title}
                  </Text>
                  <Text style={styles.entryItemText}>
                    {formatDuration(entry.duration)}
                  </Text>
                </View>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => {
                    realm.write(() => {
                      realm.delete(entry);
                    });
                  }}>
                  <Text style={styles.deleteButtonText}>x</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
        <View>
          <Text style={styles.h4}>Total practice time:</Text>
          {totalTime === 0 && <Text>You haven't practiced anything yet!</Text>}
          {totalTime > 0 && <Text>{formatDuration(totalTime)}</Text>}
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
    backgroundColor: '#E11111',
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
