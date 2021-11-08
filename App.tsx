import React from 'react';
import {StatusBar} from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins'
import theme from './src/global/styles/theme';
import { Routes } from './src/routes';
import { AppRoutes } from './src/routes/app.routes';
import { Signin } from './src/screens/Signin';
import { AuthProvider, useAuth } from './src/hooks/auth';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_700Bold
  });

  const {userStorageLoading } = useAuth();

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor="#5636d3"/>
        <AuthProvider>
        <Routes />
        </AuthProvider>
    </ThemeProvider>

  );
}

