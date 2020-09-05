import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View,Image } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DataScreen from './screens/DataScreen'
import Country from './screens/Country'

const Stack = createStackNavigator();



export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'nunito': require('./assets/fonts/Nunito-Light.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
        <NavigationContainer>
          {/* <StatusBar hidden={true}/> */}
          <Stack.Navigator initialRouteName="COVID19 Information">
            <Stack.Screen name="COVID-19 Information" component={DataScreen} options={{
                headerStyle: {
                  height: 48,
                  backgroundColor:
                    "#202125",
                },
                headerTintColor: '#e9eaee',
                headerLeft: () => (<Image source={require('./assets/images/logo.png')} style={{marginLeft:10,width:24,height:24}}/>)
                }}/>
            <Stack.Screen name="Country Statistics" component={Country} options={{
                headerStyle: {
                  height: 48,
                  backgroundColor:
                    "#202125",
                },
                headerTintColor: '#e9eaee',
                // headerLeft: () => (<Image source={require('./assets/images/logo.png')} style={{marginLeft:10,width:24,height:24}}/>)
                }}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

