import * as React  from 'react';
import {useState} from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity,TextInput, Image } from 'react-native';
import { SplashScreen, Notifications } from 'expo';
import * as Font from 'expo-font';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import Posts from "./components/Posts.js"
import CategoryApi from "./components/CategoryApi.js"
import {Context} from "./components/Context.js"
import Search from "./components/Search.js"
import {Keyboard} from 'react-native'
import GlobalVariables from "./constants/GlobalVariables.js";
import Sharing from "./components/Sharing.js"

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  //State for the drawer

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawer = () => {
    const newValue = !drawerOpen;
    setDrawerOpen(newValue);
  }
  const handleDrawer2 = (value) =>{
    setDrawerOpen(value);
  }
    // state for search and handle function
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (changed) => {
    setSearchValue(changed);
  }

  const [valueForSearchComponent, setValueForSearchComponent] = useState("");

  const handleSearchComponentValue = (value) => {

    setValueForSearchComponent(value);
  }

  const search = <View style={{flexDirection: "row"}}><TextInput placeholder='Pišite ovdje...' onEndEditing={() => handleSearchComponentValue(searchValue)} onChangeText={(changed) => handleSearch(changed) }
 style={{backgroundColor: "white",width: Platform.OS === "ios" ? 200 : 260,height:40, marginRight: 12, fontSize: 17,paddingLeft: 10}}  />
<TouchableOpacity onPress= {() => {Keyboard.dismiss(); handleSearchComponentValue(searchValue)} }>
<Ionicons color="white" size={30} style={{marginRight: 15, marginTop: 5}} name="md-search" />
</TouchableOpacity>

</View>

    // State for handeling categories
  const [category, setCategory] =  useState("fokus");

  const handleCategory = (data) => {
    const newCategory = data;
    setCategory(newCategory);
  }

  const categoryTitle = <Text style={styles.header}> {category} </Text> ;


  //Header Animation




  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
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
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Context.Provider value={{
          drawerOpen: drawerOpen,
          handleChange: handleDrawer,
          handleCategory: handleCategory,
          handleDrawerFalse: handleDrawer2,
          searchState: valueForSearchComponent}}>
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen  name="Root"  component={BottomTabNavigator} options={ ({ navigation }) => ({  headerLeft: () => {
      return(
    <TouchableOpacity activeOpacity={0.7} onPress={handleDrawer}>
    {/* {drawerOpen ? (<AntDesign style={{marginLeft: 10, marginTop: 5}} name="menufold" size={26} color="white" />) : 
    (<AntDesign style={{marginLeft: 10, marginTop: 5}} name="menuunfold" size={26} color="white" />)} */}
    <Ionicons color="white" size={32} style={{marginLeft: 10, marginTop: 5}} name="md-menu" />
    </TouchableOpacity>
      )
    },
     headerRight: () => {
      return(
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Search')}>
    <Ionicons color="white" size={30} style={{marginRight: 15, marginTop: 5}} name="md-search" />
    </TouchableOpacity>
      )

    }
     })

    } />
            <Stack.Screen name="Category" component={CategoryApi}   options={{ headerTintColor: "white",headerStyle: {
    backgroundColor: color(category),
    } , title: categoryTitle }}  />
            <Stack.Screen name="Posts" component={Posts}  options={{ headerRight: () =>{ return(<View style={{marginRight: 10}}><Sharing title={GlobalVariables.title} link={GlobalVariables.link} /></View>)}, headerTintColor: "white", title: "",headerStyle: {
    backgroundColor: color(category),
    } }}  />
                <Stack.Screen name="Search" component={Search}   options={{ headerTintColor: "white",headerStyle: {
    backgroundColor: "red",
    } , title: " ",  headerRight: () => {return (search) }}}  />
          </Stack.Navigator>
        </NavigationContainer>
        </Context.Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 25,
  }
});

 const color = (cat) => {
  switch(cat){
    case "Život+":
        return "#4C8DC3";
    case "Sport":
        return "#75ABAD";
    case "Majka i dijete":
        return  "#A8795D";
    case "Dom i vrt":
        return "brown";
    case "Eco":
        return  "green";
    case "Scena":
        return  "#DF5286";
    case "Gastro":
        return "#A0A028";
    case "Lifestyle":
        return  "purple";
    default:
        return "red";                            
}

}