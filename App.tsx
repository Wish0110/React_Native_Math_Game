import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {flex:1}]}>D000oo</Text>
      <Text style={[styles.sectionTitle, {flex:1}]}>Boo</Text>
      <Text style={[styles.sectionTitle, {flex:1}]}>Bayan</Text>
      <Text style={[styles.sectionTitle, {flex:1}]}>Bayan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 0,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-around',

  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    backgroundColor: 'gray',
    margin:10,
  },

});

export default App;