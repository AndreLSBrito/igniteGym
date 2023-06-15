import { View, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import {THEME} from './src/theme'
import { Loading } from '@components/Loading';
import { Routes } from './src/routes/index';


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})


  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        backgroundColor='transparent' 
        barStyle='light-content'
        translucent  
      />       

      {fontsLoaded ?  <Routes/> : <Loading/> }
    </NativeBaseProvider>
  );
}

