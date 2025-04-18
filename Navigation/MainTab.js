import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../src/pages/Home';
import Player from '../src/pages/Player';
import Settings from '../src/pages/Settings';
import Search from '../src/pages/Search';
import { useSelector } from 'react-redux';
import { Keyboard } from "react-native";

const Tab = createBottomTabNavigator();

const MainTab = () => {
    const { status } = useSelector((state) => state.key);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        const keybaordDidShow = Keyboard.addListener("keyboardWillShow", () => setKeyboardVisible(true));
        const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
        return () => {
            keybaordDidShow.remove();
            keyboardDidHide.remove();
        }
    }, [])
    return (
      <Tab.Navigator
        screenOptions={({ route }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Search") iconName = "magnify";
          else if (route.name === "Player") iconName = "play-circle-outline";
          else if (route.name === "Settings") iconName = "cog-outline";

          return {
            tabBarIcon: ({ color, size }) => (
              <Icon name={iconName} size={size} color={color} />
            ),
            headerShown: false,
            tabBarHideOnKeyboard: true,
          };
        }}
        initialRouteName="Search"
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Player" component={Player} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
}

export default MainTab;
