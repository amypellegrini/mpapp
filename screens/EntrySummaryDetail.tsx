import {useQuery} from '@realm/react';
import React from 'react';
import {Text, View} from 'react-native';
import RealmProviderWrapper, {PracticeEntry} from './RealmProviderWrapper';
import Container from './components/container';
import Main from './components/main';
import Title from './components/title';
import commonStyles from './components/commonStyles';
import formatDuration from './components/utils/formatDuration';

function EntrySummaryDetailContent({entryTitle, componentId}) {
  const entries = useQuery<PracticeEntry>('PracticeEntry').filtered(
    `title = "${entryTitle}"`,
  );

  return (
    <Container>
      <Main>
        <Title>{entryTitle}</Title>
        <Text style={commonStyles.h4}>Practice entries under this title</Text>
        {entries.map(entry => (
          <View key={entry._id.toString()} style={commonStyles.mb10}>
            <Text>{entry.createdAt.toLocaleString()}</Text>
            <Text>{formatDuration(entry.duration)}</Text>

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
