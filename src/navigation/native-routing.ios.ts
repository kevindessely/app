import { NativeEventEmitter, NativeModules, AsyncStorage } from 'react-native';

import { SEEN_MARKETING_CAROUSEL_KEY } from 'src/constants';
import { CHAT_SCREEN } from './screens/chat';

import { Navigation } from 'react-native-navigation';

export const setupNativeRouting = () => {
  const nativeRoutingEvents = new NativeEventEmitter(
    NativeModules.NativeRouting,
  );

  nativeRoutingEvents.addListener('NativeRoutingMarketingResult', (event) => {
    AsyncStorage.setItem(SEEN_MARKETING_CAROUSEL_KEY, 'true');
    Navigation.push(event.componentId, CHAT_SCREEN);
  });
};

export const appHasLoaded = () => {
  NativeModules.NativeRouting.appHasLoaded();
};

export const registerExternalComponentId = (
  componentId: String,
  componentName: String,
) => {
  NativeModules.NativeRouting.registerExternalComponentId(
    componentId,
    componentName,
  );
};
