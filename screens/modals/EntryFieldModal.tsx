import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Container from '../components/container';
import commonStyles from '../components/commonStyles';
import H2 from '../components/Typography/H2';
import Main from '../components/main';
import Button from '../components/button';
import {Navigation, NavigationProps} from 'react-native-navigation';

function EntryFieldModal({componentId}: NavigationProps) {
  return (
    <Container
      style={[
        {
          backgroundColor: '#444444',
          marginTop: 400,
        },
        commonStyles.btlr,
        commonStyles.btrr,
      ]}>
      <Main>
        <H2>Tap to add entry fields</H2>
        <View
          style={[
            commonStyles.flexRow,
            commonStyles.mt10,
            {
              flexWrap: 'wrap',
            },
          ]}>
          <Pressable
            style={[
              {
                backgroundColor: '#DDDDDD',
                height: 35,
              },
              commonStyles.mr10,
              commonStyles.mb10,
              commonStyles.br15,
              commonStyles.br20,
            ]}>
            <Text
              style={[
                {
                  color: '#444444',
                },
                commonStyles.p5,
                commonStyles.ph20,
                commonStyles.bold,
              ]}>
              Beats per minute (BPM)
            </Text>
          </Pressable>
          <Pressable
            style={[
              {
                backgroundColor: '#DDDDDD',
                height: 35,
              },
              commonStyles.mr10,
              commonStyles.mb10,
              commonStyles.br15,
              commonStyles.br20,
            ]}>
            <Text
              style={[
                {
                  color: '#444444',
                },
                commonStyles.p5,
                commonStyles.ph20,
                commonStyles.bold,
              ]}>
              Style
            </Text>
          </Pressable>
          <Pressable
            style={[
              {
                backgroundColor: '#DDDDDD',
                height: 35,
              },
              commonStyles.mr10,
              commonStyles.mb10,
              commonStyles.br15,
              commonStyles.br20,
            ]}>
            <Text
              style={[
                {
                  color: '#444444',
                },
                commonStyles.p5,
                commonStyles.ph20,
                commonStyles.bold,
              ]}>
              Author
            </Text>
          </Pressable>
        </View>
      </Main>
      <Button
        title="Close"
        style={[commonStyles.m6]}
        onPress={() => {
          Navigation.dismissModal(componentId);
        }}
      />
    </Container>
  );
}

export default EntryFieldModal;
