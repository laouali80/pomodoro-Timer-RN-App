import { StyleSheet, TextInput } from 'react-native';


export default function Input({ placeholder, value, onChange }) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      keyboardType="numeric"
    />
  );
}

const styles = StyleSheet.create({
 
  input: {
    // weight:,
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
  },
 
});
