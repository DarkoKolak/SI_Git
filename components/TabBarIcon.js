import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { useScrollToTop } from '@react-navigation/native';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      // onPress={() => props.focused && window.scrollTo(0,0)}
    />
  );
}
