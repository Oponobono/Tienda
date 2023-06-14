import CustomerList from "./CustomerList";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerScreen from './CustomerScreen'
import {MaterialIcons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
export default function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveBackgroundColor: 'Orange',
                tabBarActiveTintColor: 'black',
            }}
        >
        <Tab.Screen name="Customer" component={CustomerScreen} options={{
            title: 'Clientes',
            tabBarIconColor: ({color, size}) => (
                <MaterialIcons name="account-circle" color="red" size={25}/>
            )
        }}/>
        <Tab.Screen name="List" component={CustomerList} options={{
            title: 'Listar Clientes',
            tabBarIconColor: ({color, size}) => (
                <MaterialIcons name="view-list" color="blue" size={25}/>
            )
        }}/>
        </Tab.Navigator>
    );
}