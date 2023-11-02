import React from 'react';
import {View, Text, Pressable} from 'react-native';

function PracticeSummary({entryTitle, duration}) {
  return (
    <View>
      <Text>{entryTitle}</Text>
      <Text>{duration}</Text>
      <Pressable>
        <Text>Reset</Text>
      </Pressable>
      <Pressable>
        <Text>Save entry</Text>
      </Pressable>
    </View>
  );
}

export default PracticeSummary;
