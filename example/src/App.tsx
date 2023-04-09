import React, { useEffect } from "react";
import { StyleSheet, View, Text, NativeEventEmitter } from 'react-native';
import { Accelerometer } from "atlet-sensors-library";

export default function App() {
  const [result, setResult] = React.useState({
    timestamp: 0,
    x: 0,
    y: 0,
    z: 0
  });

  useEffect(() => {


    Accelerometer.setUpdateInterval(1000);

    const eventEmitter = new NativeEventEmitter(Accelerometer);

    const eventListener = eventEmitter.addListener('accelerometer', event => {
      setResult(event);
    });

    return () => Accelerometer.removeListeners(1);
  })

  return (
    <View style={styles.container}>
      <Text>Result: {result.timestamp} {result.x} {result.y} {result.z}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
