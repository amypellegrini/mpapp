import React from 'react';

import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Navigation} from 'react-native-navigation';

import Title from './screens/components/title';
import Main from './screens/components/main';
import Container from './screens/components/container';
import Welcome from './screens/Welcome';

function App({componentId}): JSX.Element {
  return <Welcome componentId={componentId} />;
}

const styles = StyleSheet.create({
  inputLabel: {
    color: '#EFEFEF',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  input: {
    color: '#EFEFEF',
    borderBottomWidth: 2,
    borderBottomColor: '#EFEFEF',
    marginBottom: 10,
  },
});

export default App;
