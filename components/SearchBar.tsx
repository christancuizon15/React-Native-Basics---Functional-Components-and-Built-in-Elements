import { View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function SearchBar() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
});