/**
 * Main App Component
 * 
 * This component sets up the application with:
 * - Redux Provider for state management
 * - Redux Persist for offline capability
 * - Navigation Container
 * - Safe Area Context
 * 
 * @module src/App
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

import { store, persistor } from './redux/store';
import RootNavigator from './navigation/RootNavigator';
import { colors } from './theme/colors';

/**
 * Root App Component
 * Wraps the entire application with necessary providers
 */
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        } 
        persistor={persistor}
      >
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

