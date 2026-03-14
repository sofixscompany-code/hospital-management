import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
});

export default function LoginScreen() {
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
    setLoading(true);
    await signIn({ email: "demo@hospitality.com", password: "demo123" });
    setLoading(false);
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back 👋</Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            setLoading(true);
            await signIn(values);
            setLoading(false);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <TextInput
                label="Email"
                mode="outlined"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                label="Password"
                mode="outlined"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                style={styles.input}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={loading}
                style={styles.button}
              >
                Login
              </Button>
            </View>
          )}
        </Formik>

        <Button
          mode="contained"
          onPress={handleDemoLogin}
          loading={loading}
          style={[styles.button, { backgroundColor: "#34d399", marginTop: 15 }]}
        >
          Demo Login
        </Button>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 18,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  input: { marginBottom: 10 },
  error: { color: "red", fontSize: 12, marginBottom: 10 },
  button: { marginTop: 10 },
});
