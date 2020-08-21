import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import FirstPage from "../components/FirstPage.js";


class SuperinfoHome extends React.Component{



    render(){

        return(
            <View style={styles.container}>
            <FirstPage navigation={this.props.navigation}/>
            </View>
                )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width:"100%",
      },

});

export default SuperinfoHome;