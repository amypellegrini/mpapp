import React, {useState} from 'react';
import {Text, TextInput, View, useColorScheme} from 'react-native';
import Button from '../components/button';
import Container from '../components/container';
import Main from '../components/main';
import commonStyles from '../components/commonStyles';
import {Navigation} from 'react-native-navigation';

function H2({children}) {
  return <Text style={[commonStyles.h2]}>{children}</Text>;
}

function GoalsModal({componentId}) {
  const [hours, onChangeHours] = useState('');
  const [minutes, onChangeMinutes] = useState('');

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Container
      style={[
        {marginTop: 60, backgroundColor: '#444444'},
        commonStyles.btlr,
        commonStyles.btrr,
      ]}>
      <Main>
        <H2>Practice time</H2>
        <Text>How much time do you want to practice each day?</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 25,
          }}>
          <View>
            <Text style={[commonStyles.h4, commonStyles.textCenter]}>
              Hours
            </Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={value => onChangeHours(value)}
              value={hours}
              placeholder="0"
              style={[
                commonStyles.input,
                commonStyles.textCenter,
                {
                  fontSize: 42,
                  paddingTop: 0,
                  fontWeight: '300',
                  width: 150,
                  color: isDarkMode ? '#BFBFBF' : '#666666',
                  borderBottomColor: isDarkMode ? '#BFBFBF' : '#666666',
                },
              ]}
              placeholderTextColor={isDarkMode ? '#BFBFBF' : '#666666'}
            />
          </View>
          <View>
            <Text style={[commonStyles.h4, commonStyles.textCenter]}>
              Minutes
            </Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={value => onChangeMinutes(value)}
              value={minutes}
              placeholder="0"
              style={[
                commonStyles.input,
                commonStyles.textCenter,
                {
                  paddingTop: 0,
                  fontWeight: '300',
                  fontSize: 42,
                  width: 150,
                  color: isDarkMode ? '#BFBFBF' : '#666666',
                  borderBottomColor: isDarkMode ? '#BFBFBF' : '#666666',
                },
              ]}
              placeholderTextColor={isDarkMode ? '#BFBFBF' : '#666666'}
            />
          </View>
        </View>
        <Button
          title="Set"
          onPress={() => {}}
          style={[{width: 150}, commonStyles.mAuto]}></Button>
      </Main>
      <Button
        style={[commonStyles.m6]}
        title="Close"
        onPress={() => {
          Navigation.dismissModal(componentId);
        }}
      />
    </Container>
  );
}

export default GoalsModal;
