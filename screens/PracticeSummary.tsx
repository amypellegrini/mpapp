import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import Title from './components/title';
import Main from './components/main';
import Container from './components/container';
import {ButtonLeft, ButtonRight} from './components/button/Button';
import {EventSubscription, Navigation} from 'react-native-navigation';

interface Props {
  entryTitle: string;
  duration: string;
  componentId: string;
}

class PracticeSummary extends React.Component<Props> {
  navigationEventListener: EventSubscription;

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  navigationButtonPressed({buttonId}) {
    console.log('Navigation button pressed!');
  }

  render() {
    const {entryTitle, duration, componentId} = this.props;

    return (
      <Container>
        <Main>
          <View>
            <Title>Practice summary</Title>
          </View>
          <View>
            <Text>Well done!</Text>
            <Text>Entry title:</Text>
            <Text>{entryTitle}</Text>
            <Text>{duration}</Text>
          </View>
        </Main>
        <View style={styles.footer}>
          <ButtonLeft title="Reset" onPress={() => {}} />
          <ButtonRight
            title="Save entry"
            onPress={() => {
              Navigation.push(componentId, {
                component: {
                  name: 'com.myApp.WelcomeScreen',
                },
              });
            }}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {},
  body: {},
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  button: {},
  buttonLeft: {},
  buttonRight: {},
  buttonLabel: {},
  entryTitle: {},
  timeDisplay: {},
});

export default PracticeSummary;
