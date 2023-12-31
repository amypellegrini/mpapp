import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from './components/container';
import Main from './components/main';
import Title from './components/title';
import {Text} from 'react-native';
import Button from './components/button';
import commonStyles from './components/commonStyles';
import {
  Navigation,
  NavigationProps,
  OptionsModalPresentationStyle,
  OptionsModalTransitionStyle,
} from 'react-native-navigation';
import Menu from './components/menu';

function Goals({componentId}: NavigationProps) {
  return (
    <Container>
      <Main>
        <Title>Goals</Title>

        <Button
          title="Daily practice time"
          onPress={() => {
            Navigation.showModal({
              stack: {
                children: [
                  {
                    component: {
                      name: 'com.myApp.GoalsModal',
                      options: {
                        modalTransitionStyle:
                          OptionsModalTransitionStyle.coverVertical,
                        modalPresentationStyle:
                          OptionsModalPresentationStyle.overCurrentContext,
                      },
                    },
                  },
                ],
              },
            });
          }}>
          <MaterialCommunityIcon
            style={commonStyles.mAuto}
            name="timer-outline"
            color="#333333"
            size={50}
          />
          <Text
            style={[
              {
                color: '#111111',
              },
              commonStyles.textCenter,
              commonStyles.mb10,
            ]}>
            Reach a daily practice target.
          </Text>
        </Button>
        <Button title="Metronome" onPress={() => {}}>
          <MaterialCommunityIcon
            style={commonStyles.mAuto}
            name="metronome"
            color="#333333"
            size={50}
          />
          <Text
            style={[
              {
                color: '#111111',
              },
              commonStyles.textCenter,
              commonStyles.mb10,
            ]}>
            Reach a metronomic target with an exercise or piece (e.g. "C major
            scale at 100 b/m").
          </Text>
        </Button>
        <Button title="Focus" onPress={() => {}}>
          <MaterialCommunityIcon
            style={commonStyles.mAuto}
            name="arrow-up-bold-hexagon-outline"
            color="#333333"
            size={50}
          />
          <Text
            style={[
              {
                color: '#111111',
              },
              commonStyles.textCenter,
              commonStyles.mb10,
            ]}>
            Accumulate practice time spent on a single exercise or piece.
          </Text>
        </Button>
      </Main>
      <Menu componentId={componentId} current="goals" />
    </Container>
  );
}

export default Goals;
