import React from 'react';

import Container from './components/container';
import Main from './components/main';
import Title from './components/title';
import RealmProviderWrapper, {
  PracticeEntry,
  PracticeEntrySummary,
} from './RealmProviderWrapper';
import {useQuery, useRealm} from '@realm/react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

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

function PracticeJournalContent() {
  const realm = useRealm();
  const entries = useQuery<PracticeEntry>('PracticeEntry');
  const entrySummaryList = useQuery<PracticeEntrySummary>(
    'PracticeEntrySummary',
  );

  return (
    <Container>
      <Main>
        <Title>Practice journal</Title>
        {entrySummaryList.map(entrySummary => (
          <View key={entrySummary._id.toString()} style={styles.mb10}>
            <Text style={styles.h6}>{entrySummary.title}</Text>
            <Text>
              {entrySummary.totalDuration} since{' '}
              {entrySummary.createdAt.toLocaleString()}
            </Text>
          </View>
        ))}
        {entries.length > 0 && (
          <View style={styles.mb10}>
            <Text style={styles.h6}>Practice history:</Text>
            {entries.map(entry => (
              <View style={styles.entryItem} key={entry._id.toString()}>
                <View>
                  <Text style={[styles.entryItemTitle, styles.entryItemText]}>
                    {entry.title}
                  </Text>
                  <Text style={styles.entryItemText}>
                    {entry.createdAt.toLocaleString()}
                  </Text>
                  <Text style={styles.entryItemText}>
                    {formatDuration(entry.duration)}
                  </Text>
                </View>
                {/* TODO: move this feature to EntrySummaryDetail */}
                {/* <Pressable
                  style={styles.deleteButton}
                  onPress={() => {
                    realm.write(() => {
                      realm.delete(entry);
                    });
                  }}>
                  <Text style={styles.deleteButtonText}>x</Text>
                </Pressable> */}
              </View>
            ))}
          </View>
        )}
      </Main>
    </Container>
  );
}

function PracticeJournal() {
  return (
    <RealmProviderWrapper>
      <PracticeJournalContent />
    </RealmProviderWrapper>
  );
}

const styles = StyleSheet.create({
  h6: {
    color: '#EFEFEF',
    fontWeight: 'bold',
  },
  mb10: {
    marginBottom: 10,
  },
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
});

export default PracticeJournal;
