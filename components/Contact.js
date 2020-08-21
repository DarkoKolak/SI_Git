import React from 'react';
import {StyleSheet,Text, View, Image } from 'react-native';

class Contact extends React.Component{

 render(){
    return(
        <View style={styles.container}>
                 <View style={styles.kontainerslike} >
                    <Image style={styles.slika} source = {require("../assets/images/kontakt.jpg")} />
                </View>
            <Text style={styles.naslov}>
            {"\n"}
            Kontakt informacije
            </Text>
            <Text style={styles.ostalitext}>
                Vitera d.o.o.{"\n"}
                Poslovni centar 96 – zona II{"\n"}
                72250 Vitez BiH{"\n"}
                Telefon: +387 63 046 959{"\n"}
                Fax: +387 30 718 720{"\n"}
                Email: viterapriprema@gmail.com{"\n"}
                Web: www.vitera.ba{"\n"}{"\n"}

                

                Bojana Naimarević{"\n"}

                Kontakt telefon: +387 61 677 670{"\n"}

                e – mail: naimarevic.bojana@gmail.com{"\n"}
           </Text>
        </View>
    )
}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    width:"100%",
    height:"100%"
  },
  naslov: {
    width: "95%",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    letterSpacing: 0.5,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 5
  },
  kontainerslike: {
    height: 190,
    width: "100%",
    alignSelf: "center"
},
kontainerSlike2:{
    height: 400,
    width: "100%",
    alignSelf: "center"
},
ostalitext:{
    fontSize: 16,
    letterSpacing: 0.5,
    marginLeft: 5,
    width: "92%",
    marginLeft: 5,
    marginBottom: 15,

},
slika: {
    width: "100%",
    height: "100%",
    alignSelf: "center"

},
slika2: {
    width: "95%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 12

},

});


export default Contact;