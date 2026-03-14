import { registerRootComponent } from "expo";
import "react-native-gesture-handler";
import App from "./App";
import patchUrlProtocol from "./utils/urlProtocolPatch";

// Safely patch URL protocol for deep linking
try {
  patchUrlProtocol();
} catch (error) {
  // If patching fails, log the warning but allow the app to continue
  // This prevents startup crashes due to deep linking patch issues
  // eslint-disable-next-line no-console
  console.warn("Failed to patch URL protocol:", error);
}

// Register the main App component with Expo
registerRootComponent(App);