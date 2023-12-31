import HomeTabs from './components/HomeTabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{
          title: 'Sistema de Clientes'
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
);
}