import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

function Practice() {
  const startTime = Date.now();

  const [seconds, setSeconds] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);

      if (elapsedSeconds > seconds) {
        setSeconds(elapsedSeconds);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View>
      <Text>{seconds}</Text>
    </View>
  );
}

export default Practice;
