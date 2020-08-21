import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {StyleSheet, Text,} from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import SuperinfoHome from '../screens/SuperinfoHome';
import Fokus from "../components/Fokus.js"
import Onama from "../components/Onama.js"
import Contact from "../components/Contact.js"
import Drawer from 'react-native-drawer';
import SideBar from "../screens/SideBar.js";
import {Context} from "../components/Context.js";



const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Superinfo';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({headerTitleStyle: {flex: 1, textAlign: 'center' }, headerTitle: <Text style={styles.headerText}>{getHeaderTitle(route)}</Text>,headerTintColor:'white',
    fontWeight: 'bold',headerStyle: {
      backgroundColor: '#EB1E23',
  },
 });

 let drawer = null;

 const closeControlPanel = () =>{
  drawer.close()
};
const openControlPanel = () => {
  drawer.open()
};

  return (
    <Context.Consumer>
    {data => {
        return(
    <Drawer
    open={data.drawerOpen}
    tweenDuration={300}
    captureGestures={true}
    type="displace"
    openDrawerOffset={0.15}
    onClose={data.handleDrawerFalse(false)}
    ref={(ref) => drawer = ref}
    content={<SideBar navigation={navigation} handleStateDrawer={data.handleChange} drawerClose = {closeControlPanel} />}
>
    <BottomTab.Navigator tabBarOptions={{activeTintColor: "red"}} initialRouteName={INITIAL_ROUTE_NAME}>

        <BottomTab.Screen
        name="Superinfo"
        component={SuperinfoHome}
        options={{
          title: 'Početna',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
              <BottomTab.Screen
        name="API"
        component={Fokus}
        options={{
          title: 'Fokus',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-aperture" />,
        }}
      />
      
      <BottomTab.Screen
        name="O nama"
        component={Onama}
        options={{
          title: 'O nama',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />,
        }}
      />
      <BottomTab.Screen
        name="Kontakt"
        component={Contact}
        options={{
          title: 'Kontakt',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-contact" />,
        }}
      />
    </BottomTab.Navigator>
    </Drawer>
        )
    }}
    </Context.Consumer>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'O nama':
      return <Text style={styles.header}>O nama</Text>;
    case 'Kontakt':
      return <Text style={styles.header}>Kontakt</Text>;
      case "API":
      return <Text style={styles.header}>Fokus</Text>
    default :
      return (
        <Text style={styles.header}>
          <Text>
         Superinfo
          </Text>
        </Text>
          
        );  
  }
}

const styles = StyleSheet.create({
  headerText: {
      fontStyle: "italic",
      fontWeight: "bold",
      fontSize: 25,
      flex: 1,
      flexDirection: "row",
  }, header:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  }


});
