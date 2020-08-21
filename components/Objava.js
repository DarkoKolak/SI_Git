import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GlobalVariables from "../constants/GlobalVariables.js";
import {Context} from "./Context.js";
import { Ionicons } from '@expo/vector-icons';


class Objava extends React.Component{

    changeDate = (date) =>{
        const stringDate = date.substring(0,10);
        const day = stringDate.substring(8);
        const month = stringDate.substring(5,7);
        const year = stringDate.substring(0,4);
        return(
            <View style={{flexDirection: "row", justifyContent:"space-between"}}>
            <Text style={{paddingTop: 0}}>
                {day}.{month}.{year}
            </Text>
            <Ionicons color="black" size={15} name="md-share" />
            </View>
        )
    }
    cutString = (string) => {

        if(string.length > 100 ){
            let output1 = string.substring(0,100);
            let output2 = string.substring(100);
            let output3 = output2.substring(0,output2.indexOf(" ")+1) + "...";
            const toReturn = output1 + output3 ;
            
            return(
                toReturn
            )
        }
        return string;

    }

    onPress= (image,content,title,category) =>{
            GlobalVariables.image= image;
              let result3 = content.replace(/iframe/g, "iframe allowfullscreen='allowfullscreen'");
            GlobalVariables.content = result3;
            GlobalVariables.title = title;
            GlobalVariables.link = this.props.link;
            category(this.props.category);
            this.props.navigation.navigate("Posts")
    }

    

    render(){
        let image = this.props.image;
        return(
        <Context.Consumer>
        {data => {
        return(
            <TouchableOpacity onPress={() => this.onPress(image,this.props.content,this.props.title, data.handleCategory)}>
            <View style={styles.objava}>
            <View style={styles.kontainerslike}>
                 <Image
                    source={{uri:image}}
                    style={styles.slika}
                 />
            </View>
            <View style={styles.textBox}>
                 <Text style={styles.textObjave}>
                    {this.cutString(this.props.title)}
                 </Text>
                 <Ionicons style={{marginLeft: "95%"}} color="black" size={15} name="md-share" />
                 <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#CED0CE",
            }}
          />
                 </View>
            </View>
            </TouchableOpacity>
        )
    }}
            </Context.Consumer>
        )
    }
}



const styles = StyleSheet.create({
        objava: {
            width: "96%",
            height: 100,
            marginBottom: 10,
            alignSelf: "center",
            flex: 2,
            flexDirection:'row',
            

        },
        kontainerslike: {
            height: "100%",
            width: "30%"

        },
        slika: {
            width: "100%",
            alignSelf: "center",
            height: "100%",

        },
        textObjave: {
            width: "100%",
            fontStyle: "italic",
            fontSize: 16,
            height: "83%"
            
        },
        textBox:{
            marginLeft: "3%",
            width: "66%",
            marginTop: "-1%"
        }


});


export default Objava;