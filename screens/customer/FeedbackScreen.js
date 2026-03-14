
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

import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { submitReview } from "../../services/orderService";
import { colors, globalStyles } from "../../styles/globalStyles";

const FeedbackSchema = Yup.object().shape({
  reviewText: Yup.string()
    .min(10, "Review must be at least 10 characters")
    .required("Review is required"),
});

export default function FeedbackScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params;
  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async (values) => {
    setLoading(true);
    try {
      await submitReview(orderId, values.reviewText, 1); // userId hardcoded for demo
      Alert.alert(
        "Thank you!",
        "Your feedback has been submitted. Check your loyalty points!",
        [{ text: "OK", onPress: () => navigation.navigate("Loyalty") }],
      );
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[globalStyles.container, styles.feedbackContainer]}>
      <Text style={styles.title}>Share Your Feedback</Text>
      <Text style={styles.subtitle}>
        Help us improve and earn loyalty points!
      </Text>

      <Formik
        initialValues={{ reviewText: "" }}
        validationSchema={FeedbackSchema}
        onSubmit={handleSubmitReview}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              label="Your Review"
              value={values.reviewText}
              onChangeText={handleChange("reviewText")}
              onBlur={handleBlur("reviewText")}
              error={touched.reviewText && errors.reviewText}
              style={styles.reviewInput}
              multiline
              numberOfLines={6}
              placeholder="Tell us about your experience..."
            />
            {touched.reviewText && errors.reviewText && (
              <Text style={styles.error}>{errors.reviewText}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              style={styles.submitButton}
              buttonColor={colors.primary}
            >
              Submit Review
            </Button>
          </View>
        )}
      </Formik>

      <Text style={styles.info}>
        Positive reviews earn 10 points, neutral earn 3 points, and negative
        earn 0 points.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  feedbackContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  form: {
    width: "100%",
  },
  reviewInput: {
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
  info: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 20,
  },
});
