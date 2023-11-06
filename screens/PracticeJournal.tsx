import React from 'react';

import Container from './components/container';
import Main from './components/main';
import Title from './components/title';
import RealmProviderWrapper, {
  PracticeEntrySummary,
} from './RealmProviderWrapper';
import {useQuery} from '@realm/react';
import {View, Text, StyleSheet} from 'react-native';

function PracticeJournalContent() {
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
});

export default PracticeJournal;
