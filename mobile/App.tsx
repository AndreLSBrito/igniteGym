import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes/index';

import { AuthContextProvider } from '@contexts/AuthContext';

import {THEME} from './src/theme'
import { Loading } from '@components/Loading';


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})


  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        backgroundColor='transparent' 
        barStyle='light-content'
        translucent  
      />       
      <AuthContextProvider>
        {fontsLoaded ?  <Routes/> : <Loading/> }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

