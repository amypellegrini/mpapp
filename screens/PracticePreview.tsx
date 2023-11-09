import React from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import Title from './components/title';
import Main from './components/main';
import Container from './components/container';
import commonStyles from './components/commonStyles';

function PracticePreview({componentId}): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [entryTitle, onChangeEntryTitle] = React.useState('');

  return (
    <Container>
      <Main>
        <Title>The Music Practice App</Title>
        <Text
          style={[
            commonStyles.h4,
            {
              color: isDarkMode ? '#EFEFEF' : '#202020',
            },
          ]}>
          What are you playing?
        </Text>
        <TextInput
          placeholder='Practice entry title (e.g. "Moonlight Sonata")'
          onChangeText={value => onChangeEntryTitle(value)}
          value={entryTitle}
          style={[
            commonStyles.input,
            {
              color: isDarkMode ? '#BFBFBF' : '#666666',
              borderBottomColor: isDarkMode ? '#BFBFBF' : '#666666',
            },
          ]}
          placeholderTextColor={isDarkMode ? '#BFBFBF' : '#666666'}
        />
        <Pressable style={styles.entryFieldButton}>
          <View style={styles.plusButton}>
            <Text style={styles.plusIcon}>+</Text>
          </View>
          <Text
            style={[
              styles.entryFieldText,
              {
                color: isDarkMode ? '#BFBFBF' : '#666666',
              },
            ]}>
            Add entry field (e.g. key, time signature, etc.)
          </Text>
        </Pressable>
      </Main>
      <Pressable
        disabled={entryTitle.length === 0}
        style={({pressed}) => {
          let backgroundColor = pressed ? '#2255DD' : '#3366EE';

          if (entryTitle.length === 0) {
            backgroundColor = '#666666';
          }

          return [
            {
              backgroundColor,
            },
            styles.button,
          ];
        }}
        onPress={() => {
          Navigation.push(componentId, {
            component: {
              name: 'com.myApp.Practice',
              passProps: {
                entryTitle: entryTitle,
              },
            },
          });
        }}>
        <Text
          style={[
            styles.buttonText,
            {
              color: isDarkMode ? '#BFBFBF' : '#FFFFFF',
            },
          ]}>
          Start practice
        </Text>
      </Pressable>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 20,
    height: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    margin: 6,
    borderRadius: 4,
    height: 60,
  },
  entryFieldButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryFieldText: {
    height: 30,
    marginLeft: 1,
    marginBottom: -7,
    fontStyle: 'italic',
  },
  plusButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EFEFEF',
    margin: 5,
    marginLeft: 0,
  },
  plusIcon: {
    marginTop: -5,
    height: 30,
    width: 30,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#666666',
  },
});

export default PracticePreview;
