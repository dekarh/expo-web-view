import { StyleSheet, Text, View } from 'react-native';

import * as ExpoWebView from 'expo-web-view';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoWebView.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
