export default function patchUrlProtocol() {
  const globalObj = typeof globalThis !== "undefined" ? globalThis : null;
  if (!globalObj || typeof globalObj.URL === "undefined") {
    return;
  }

  const prototype = globalObj.URL.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "protocol");

  if (!descriptor || descriptor.set || descriptor.configurable === false) {
    // If the property is already writable or can't be reconfigured, don't attempt to patch.
    return;
  }

  const getter = descriptor.get;

  try {
    Object.defineProperty(prototype, "protocol", {
      configurable: true,
      enumerable: descriptor.enumerable,
      get() {
        return getter ? getter.call(this) : this.href?.split(":")[0];
      },
      set(value) {
        const href = this.href ?? "";
        const colonIndex = href.indexOf(":");
        const rest = colonIndex >= 0 ? href.slice(colonIndex) : "";
        this.href = `${value}${rest}`;
      },
    });
  } catch (error) {
    // Some JS runtimes (including certain React Native environments) make URL.prototype.protocol non-configurable.
    // In that case, we can't patch it, so we fallback to leaving it read-only.
    // This is safe because the only known consumer of this patch is expo-asset which now avoids setting it directly.
  }
}
