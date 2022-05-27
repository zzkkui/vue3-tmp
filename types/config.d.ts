export interface ProjectConfig {
  // Whether to open page switching loading
  openPageLoading: boolean;
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean;
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // If it is enabled, I want to overwrite a single interface. Can be set in a separate interface
  removeAllHttpPending: boolean;
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean;
}
