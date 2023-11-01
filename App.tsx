import React from 'react';

import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Navigation} from 'react-native-navigation';

function App({componentId}): JSX.Element {
  const [text, onChangeText] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>The Music Practice App</Text>
        <Text style={styles.inputLabel}>What are you playing?</Text>
        <TextInput
          placeholder="Practice entry title"
          onChangeText={value => onChangeText(value)}
          value={text}
          style={styles.input}
        />
        <Pressable style={styles.entryFieldButton}>
          <View style={styles.plusButton}>
            <Text style={styles.plusIcon}>+</Text>
          </View>
          <Text style={styles.entryFieldText}>
            Add entry field (e.g. key, time signature, etc.)
          </Text>
        </Pressable>
      </View>
      <Pressable
        disabled={text.length === 0}
        style={({pressed}) => {
          let backgroundColor = pressed ? '#2255DD' : '#3366EE';

          if (text.length === 0) {
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
            },
          });
        }}>
        <Text style={styles.buttonText}>Start practice</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  main: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  title: {
    color: '#EFEFEF',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
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
