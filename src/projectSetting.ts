const setting = {
  // Whether to open page switching loading
  openPageLoading: true,
  // pageLayout whether to enable keep-alive
  openKeepAlive: true,
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // If it is enabled, I want to overwrite a single interface. Can be set in a separate interface
  removeAllHttpPending: false,
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: true,
};

export default setting;
