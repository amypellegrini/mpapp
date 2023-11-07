import {useQuery, useRealm} from '@realm/react';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import RealmProviderWrapper, {PracticeEntry} from './RealmProviderWrapper';
import Container from './components/container';
import Main from './components/main';
import Title from './components/title';
import {Results} from 'realm';

function EntrySummaryDetailContent({entryTitle, componentId}) {
  const entries = useQuery<PracticeEntry>('PracticeEntry').filtered(
    `title = "${entryTitle}"`,
  );

  console.log('entries', entries);

  return (
    <Container>
      <Main>
        <Title>{entryTitle}</Title>
        {entries.map(entry => (
          <View key={entry._id.toString()}>
            <Text>{entry.createdAt.toLocaleString()}</Text>
            <Text>{entry.duration}</Text>

            {/* <Pressable
                  style={styles.deleteButton}
                  onPress={() => {
                    realm.write(() => {
                      // Sync summary totalDuration
                      realm.delete(entry);
                    });
                  }}>
                  <Text style={styles.deleteButtonText}>x</Text>
                </Pressable> */}
          </View>
        ))}
      </Main>
    </Container>
  );
}

function EntrySummaryDetail({entryTitle, componentId}) {
  return (
    <RealmProviderWrapper>
      <EntrySummaryDetailContent
        entryTitle={entryTitle}
        componentId={componentId}
      />
    </RealmProviderWrapper>
  );
}

export default EntrySummaryDetail;
