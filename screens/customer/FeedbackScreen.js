
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const FeedbackScreen = ({ navigation }) => {
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    if (!review) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }

    // Simulate submitting feedback
    Alert.alert('Feedback Submitted', 'Thank you for your feedback!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Loyalty'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave a Review</Text>
      <TextInput
        style={styles.input}
        placeholder="How was your experience?"
        value={review}
        onChangeText={setReview}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
});

export default FeedbackScreen;
