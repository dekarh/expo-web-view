import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoWebViewProps } from './ExpoWebView.types';

const NativeView: React.ComponentType<ExpoWebViewProps> =
  requireNativeViewManager('ExpoWebView');

export default function ExpoWebView(props: ExpoWebViewProps) {
  return <NativeView {...props} />;
}
