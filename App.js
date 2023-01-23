import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/home';
import Event from './screens/event';
import Search from './screens/search';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
     <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="home" component={Home}/>
          <Tab.Screen name="search" component={Search} />
          <Tab.Screen name="event" component={Event} />
        </Tab.Navigator>
     </NavigationContainer>
  );
}

