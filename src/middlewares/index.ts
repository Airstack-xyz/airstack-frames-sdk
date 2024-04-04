export * from "./frog";
export * from "./framesjs";

// This is to handle backward compatibility with previous versions
// of the SDK. This will be removed in the future versions.
export {
  /**
   * @deprecated since version 1.0.21. Use `onchainDataFrogMiddleware` instead.
   */
  onchainDataFrogMiddleware as onchainData,
} from "./frog/onchainData";
export {
  /**
   * @deprecated since version 1.0.21. Use `allowListFrogMiddleware` instead.
   */
  allowListFrogMiddleware as allowList,
} from "./frog/allowList";
