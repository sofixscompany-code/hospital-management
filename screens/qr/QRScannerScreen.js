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
<<<<<<< HEAD
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
=======
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.navigate('Menu');
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
>>>>>>> ad4022e44602687d7281cc64d15c232c9df781b1
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
<<<<<<< HEAD
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
=======
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default QRScannerScreen;
>>>>>>> ad4022e44602687d7281cc64d15c232c9df781b1
