import React from 'react';
import {View, Text} from 'react-native';
import {useRealm} from '@realm/react';
import RealmProviderWrapper from './RealmProviderWrapper';
import Container from './components/container';
import Title from './components/title';
import Main from './components/main';

function DashboardContent() {
  const realm = useRealm();
  const entries = realm.objects('PracticeEntry');

  return (
    <Container>
      <Main>
        <Title>Dashboard</Title>
        <View>
          {entries.map(entry => (
            <View key={entry.title}>
              <Text>{entry.title}</Text>
              <Text>{entry.duration}</Text>
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

export default Dashboard;
