import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import Todos from './components/Todos';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <Box minH={'80%'}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen
                name='Home'
                component={Todos}
                options={{
                  animation: 'flip',
                  title: 'Yettz',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
}
