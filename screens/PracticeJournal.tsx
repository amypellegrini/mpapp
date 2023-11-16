import React from 'react';

import Container from './components/container';
import Main from './components/main';
import Title from './components/title';
import RealmProviderWrapper, {
  PracticeEntry,
  PracticeEntrySummary,
} from './RealmProviderWrapper';
import {useQuery} from '@realm/react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import {Navigation, NavigationProps} from 'react-native-navigation';
import commonStyles from './components/commonStyles';
import formatDuration from './components/utils/formatDuration';

function PracticeJournalContent({componentId}: NavigationProps) {
  const entries = useQuery<PracticeEntry>('PracticeEntry');
  const entrySummaryList = useQuery<PracticeEntrySummary>(
    'PracticeEntrySummary',
  );

  return (
    <Container>
      <Main>
        <Title>Practice journal</Title>
        <View
          style={[
            commonStyles.mb10,
            {
              maxHeight: '30%',
            },
          ]}>
          <Text style={commonStyles.h4}>Practice summary</Text>
          <ScrollView>
            {entrySummaryList.map(entrySummary => {
              const entryTitleCopy = entrySummary.title;
              return (
                <Pressable
                  style={styles.entryItem}
                  key={entrySummary._id.toString()}
                  onPress={() => {
                    Navigation.push(componentId, {
                      component: {
                        name: 'com.myApp.EntrySummaryDetail',
                        passProps: {
                          entryTitle: entryTitleCopy,
                        },
                      },
                    });
                  }}>
                  <Text style={[commonStyles.h6, styles.entryItemText]}>
                    {entrySummary.title}
                  </Text>
                  <Text style={[styles.entryItemText]}>
                    {formatDuration(entrySummary.totalDuration)} since{' '}
                    {entrySummary.createdAt.toLocaleString()}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
        {entries.length > 0 && (
          <View style={{maxHeight: '30%'}}>
            <Text style={commonStyles.h4}>Practice history</Text>
            <ScrollView>
              {entries.map(entry => (
                <View key={entry._id.toString()} style={commonStyles.mb10}>
                  <Text style={[commonStyles.h6]}>{entry.title}</Text>
                  <Text>{entry.createdAt.toLocaleString()}</Text>
                  <Text>{formatDuration(entry.duration)}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </Main>
    </Container>
  );
}

function PracticeJournal(props: NavigationProps) {
  return (
    <RealmProviderWrapper>
      <PracticeJournalContent {...props} />
    </RealmProviderWrapper>
  );
}

const styles = StyleSheet.create({
  entryItem: {
    borderRadius: 4,
    backgroundColor: '#DFDFDF',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#666666',
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
  entryItemText: {
    color: '#111111',
  },
});

export default PracticeJournal;
