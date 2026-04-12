import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="principal"
        options={{
          title: 'Principal',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="transacao"
        options={{
          title: 'Transação',
          href: null,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="despesas"
        options={{
          title: 'Despesas',
          href: null,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="receitas"
        options={{
          title: 'Receitas',
          href: null,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="investimentos"
        options={{
          title: 'Investimentos',
          href: null,
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
