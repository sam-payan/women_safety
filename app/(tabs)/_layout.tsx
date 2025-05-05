import { Tabs } from "expo-router"
import React from "react"
import { Platform } from "react-native"

import { HapticTab } from "@/components/HapticTab"
import { IconSymbol } from "@/components/ui/IconSymbol"
import TabBarBackground from "@/components/ui/TabBarBackground"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"
import Ionicons from "@expo/vector-icons/Ionicons"

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="tabHome"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="newspaper-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: "sos",
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={28}
              name="chatbubble-ellipses-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="schemes"
        options={{
          title: "Schemes",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="easel-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="person-sharp" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}