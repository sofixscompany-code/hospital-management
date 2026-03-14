import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { CartContext } from "../../context/CartContext";
import { colors, globalStyles } from "../../styles/globalStyles";

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const { setTableNumber } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (data.startsWith("TABLE_")) {
      const tableNumber = data.split("_")[1];
      setTableNumber(tableNumber);
      Alert.alert("Success", `Table ${tableNumber} scanned successfully!`, [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert("Invalid QR Code", "Please scan a valid table QR code.");
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Scan Table QR Code</Text>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeScannerSettings={{
          barCodeTypes: [Camera.Constants.BarCodeType.qr],
        }}
      />
      {scanned && (
        <View style={styles.overlay}>
          <Button
            mode="contained"
            onPress={() => setScanned(false)}
            buttonColor={colors.primary}
          >
            Tap to Scan Again
          </Button>
        </View>
      )}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Point your camera at the QR code on your table
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: colors.text,
  },
  overlay: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
  },
  instructions: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 10,
  },
  instructionText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
