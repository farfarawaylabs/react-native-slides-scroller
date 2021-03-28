import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Scroller } from '@farfarawaylabs/react-native-slides-scroller';

import { items } from './Model';

export default function App() {
  return (
    <View style={styles.container}>
      <Scroller items={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
