import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoWebView.web.ts
// and on native platforms to ExpoWebView.ts
import ExpoWebViewModule from './ExpoWebViewModule';
import ExpoWebView from './ExpoWebView';
import { ChangeEventPayload, ExpoWebViewProps } from './ExpoWebView.types';

// Get the native constant value.
export const PI = ExpoWebViewModule.PI;

export function hello(): string {
  return ExpoWebViewModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoWebViewModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoWebViewModule ?? NativeModulesProxy.ExpoWebView);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoWebView, ExpoWebViewProps, ChangeEventPayload };
