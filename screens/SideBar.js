import React from "react";
import { Platform, StatusBar, StyleSheet, View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import GlobalVariables from "../constants/GlobalVariables.js"
import {Context} from "../components/Context.js";
import {ScrollView } from 'react-native-gesture-handler';
import { Entypo, FontAwesome } from '@expo/vector-icons';

class SideBar extends React.Component{

    redirect = (value, handleCategory, category) => () =>{
        handleCategory(category);
        GlobalVariables.category = value;
        this.props.navigation.navigate("Category");
        this.props.handleStateDrawer();
    }
    redirectFocus = () =>{
        this.props.navigation.navigate("Root");
        this.props.drawerClose();
    }

    render(){

        return(
            <ScrollView 
               contentContainerStyle={{
     flex: 1
  }}>
            <View style={styles.container}>
            <Context.Consumer>
            {data => {
                return(
                <>
                <Image source={require("../assets/images/sp.jpg")} style={{height:100,width:"100%",marginTop:0.1}} />
            <TouchableOpacity activeOpacity={0.5} onPress={this.redirect(5, data.handleCategory, "Život+")} style={{flexDirection: "row",}}>
            <FontAwesome name="heartbeat" size={26.5} color={styles.superinfo.color} style={{marginTop: "8.5%",marginLeft: 7}} />
                <Text style={styles.superinfo}>
                 ŽIVOT+ 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={this.redirect(9, data.handleCategory, "Sport")} style={{flexDirection: "row",borderTopWidth: 0.5,
        borderColor: '#ddd'}}>
            <Entypo name="trophy" size={26.5} color={styles.superinfo2.color} style={{marginTop: "8.5%",marginLeft: 7}} />
                <Text style={styles.superinfo2}>
                    SPORT
                </Text>
            </TouchableOpacity>
             <TouchableOpacity activeOpacity={0.5} onPress={this.redirect(2, data.handleCategory, "Majka i dijete")}  style={{flexDirection: "row",borderTopWidth: 0.5,
        borderColor: '#ddd',}}>
            <FontAwesome name="child" size={26.5} color={styles.superinfo3.color} style={{marginTop: "8.5%",marginLeft: 12}} />
                <Text style={styles.superinfo3}>
                    MAJKA I DIJETE
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={this.redirect(3, data.handleCategory, "Dom i vrt")}  style={{flexDirection: "row",borderTopWidth: 0.5,
        borderColor: '#ddd',}}>
            <FontAwesome name="home" size={26.5} color={styles.superinfo4.color} style={{marginTop: "8.5%",marginLeft: 10}} />
                <Text style={styles.superinfo4}>
                    DOM I VRT
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={this.redirect(10, data.handleCategory, "Gastro")}  style={{flexDirection: "row",borderTopWidth: 0.5,
        borderColor: '#ddd'}}>
            <FontAwesome name="glass" size={26.5} color={styles.superinfo5.color} style={{marginTop: "8.5%",marginLeft: 10}} />
                <Text style={styles.superinfo5}>
                    GASTRO
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={this.redirect(31, data.handleCategory, "Eco")}  style={{flexDirection: "row",borderTopWidth: 0.5,
        borderColor: '#ddd'}}>
            <Entypo name="tree" size={26.5} color={styles.superinfo6.color} style={{marginTop: "8.5%",marginLeft: 10}} />
                <Text style={styles.superinfo6}>
                    ECO
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={this.redirect(7, data.handleCategory, "Scena")}  style={{flexDirection: "row",borderTopWidth: 0.5,
        borderColor: '#ddd'}}>
            <FontAwesome name="camera" size={26.5} color={styles.superinfo7.color} style={{marginTop: "8.5%",marginLeft: 10}} />
                <Text style={styles.superinfo7}>
                    SCENA
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={this.redirect(8, data.handleCategory, "Lifestyle")}  style={{flexDirection: "row",borderTopWidth: 0.5,
        borderColor: '#ddd'}}>
            <Entypo name="emoji-happy" size={26.5} color={styles.superinfo8.color} style={{marginTop: "8.5%",marginLeft: 10}} />
                <Text style={styles.superinfo8}>
                    LIFESTYLE
                </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity activeOpacity={0.5} onPress={() => {Linking.openURL("https://superinfo.ba/marketing/"); this.props.handleStateDrawer();}}  style={{flexDirection: "row",borderTopWidth: 0.5,
        borderColor: '#ddd'}}>
            <Entypo name="dots-two-horizontal" size={26.5} color={styles.superinfo9.color} style={{marginTop: "8.5%",marginLeft: 10}} />
                <Text style={styles.superinfo9}>
                    Marketing
                </Text>
            </TouchableOpacity> */}
            <TouchableOpacity activeOpacity={0.5} onPress={() => {Linking.openURL("https://superinfo.ba/app/Superinfo.pdf");this.props.handleStateDrawer();}}  style={{flexDirection: "row",borderTopWidth: 0.5,
        borderColor: '#ddd'}}>
            <FontAwesome name="file-pdf-o" size={26.5} color={styles.superinfo10.color} style={{marginTop: "8.5%",marginLeft: 13}} />
                <Text style={styles.superinfo10}>
                Posljednji primjerak našeg magazina u PDF formatu
                </Text>
            </TouchableOpacity>
            </>
                )

            }}

            </Context.Consumer>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width:"100%",
        borderRightWidth: 2,
        borderColor: '#ddd',
        
        
      },
      slika:{
          alignSelf: "center",
          width: "70%",
          height: 100,
          marginTop: 10,
          marginBottom: 20
      },

    superinfo: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        marginTop: "9%",
        textAlign: 'center',
        color: "#4C8DC3",
        marginLeft: 10,

    },
    superinfo2: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        marginTop: "9%",
        textAlign: 'center',
        color: "#75ABAD",
        marginLeft: 10
    },
    superinfo3: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        marginTop: "9%",
        textAlign: 'center',
        color: "#A8795D",
        marginLeft: 13
    },
    superinfo4: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        marginTop: "9%",
        textAlign: 'center',
        color: "brown",
        marginLeft: 10
    }, 
    superinfo5: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        marginTop: "9%",
        textAlign: 'center',
        color: "#A0A028",
        marginLeft: 10
    },
    superinfo6: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        marginTop: "9%",
        textAlign: 'center',
        color: "green",
        marginLeft: 10
    },
    superinfo7: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        marginTop: "9%",
        textAlign: 'center',
        color: "#DF5286",
        marginLeft: 10
    },
    superinfo8: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        marginTop: "9%",
        textAlign: 'center',
        color: "purple",
        marginLeft: 13
    },
    superinfo9: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        marginTop: "9%",
        textAlign: 'center',
        color: "#EDAF02",
        marginLeft: 10
    },
    superinfo10: {
        color: "white",
        fontSize: 11.3,
        fontWeight: "bold",
        fontStyle: "italic",
        marginTop: "9%",
        textAlign: 'center',
        color: "#EB1E23",
        marginLeft: 10
    },

});

export default SideBar;