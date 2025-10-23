/**
 * Main Entry Point for News App
 * 
 * This file serves as the root of the application, setting up:
 * - Redux store with persistence
 * - Navigation container
 * - Gesture handler configuration
 * - Safe area context
 * 
 * @module src/index
 */

import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

// Register the app component as the root component
registerRootComponent(App);

