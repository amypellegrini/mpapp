import React from 'react';
import {Text, TextInput, View, useColorScheme} from 'react-native';
import Button from '../components/button';
import Container from '../components/container';
import Main from '../components/main';
import commonStyles from '../components/commonStyles';
import {Navigation} from 'react-native-navigation';

function H2({children}) {
  return <Text style={[commonStyles.h2]}>{children}</Text>;
}

function GoalsModal() {
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
          }}>
          <View style={{marginHorizontal: 10}}>
            <Text style={{textAlign: 'center'}}>Hours:</Text>
            <TextInput
              keyboardType="numeric"
              // onChangeText={value => onChangeEntryTitle(value)}
              value={'0'}
              style={[
                commonStyles.input,
                commonStyles.textCenter,
                {
                  width: 80,
                  color: isDarkMode ? '#BFBFBF' : '#666666',
                  borderBottomColor: isDarkMode ? '#BFBFBF' : '#666666',
                },
              ]}
              placeholderTextColor={isDarkMode ? '#BFBFBF' : '#666666'}
            />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{textAlign: 'center'}}>Minutes:</Text>
            <TextInput
              keyboardType="numeric"
              // onChangeText={value => onChangeEntryTitle(value)}
              value={'0'}
              style={[
                commonStyles.input,
                commonStyles.textCenter,
                {
                  width: 80,
                  color: isDarkMode ? '#BFBFBF' : '#666666',
                  borderBottomColor: isDarkMode ? '#BFBFBF' : '#666666',
                },
              ]}
              placeholderTextColor={isDarkMode ? '#BFBFBF' : '#666666'}
            />
          </View>
        </View>
      </Main>
      <Button style={[commonStyles.m6]} title="Close" onPress={() => {}} />
    </Container>
  );
}

export default GoalsModal;
