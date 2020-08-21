import React from 'react';
import {StyleSheet,Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


class Onama extends React.Component{

    render(){
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.kontainerslike} >
                    <Image style={styles.slika} source = {require("../assets/images/Vitera.jpg")} />
                </View>
                <Text style={styles.naslov}>
                STARI PROJEKAT U NOVOM RUHU
                </Text>
                <Text style={styles.ostalitext}>
                Izuzetno teško vrijeme u kojem živimo, posebno je obilježila duboka finansijska kriza i recesija, koja je proizvela veliku poslovnu nesigurnost i globalnu nelikvidnost.{"\n"} {"\n"}
                Ipak, unatoč svemu, mi smo odlučili pokrenuti jedan novi-stari projekat koji će biti sasvim suprotan od današnjih ekonomskih trendova.
                 Superinfo je magazin koji afirmira pozitivne vrijednosti, i želi da prenese čitaocima sve one dobre i pozitivne informacije koje imaju u ova dva kantona: Zeničko – dobojskom i Srednjebosanskom kantonu /Kantonu Središnja Bosna.{"\n"}{"\n"}
                Naša misija je da kroz koristan, stručan, aktualan i zanimljiv sadržaj te kontinuiranu dvosmjernu komunikaciju preko tiskanog izdanja, portala www.superinfo.ba i društvenih mreža, nadahnemo čitaoce na donošenje pozitivnih odluka te na taj način utječemo pozitivno na društvo u kojem živimo.{"\n"}
                Želimo postati mjesto informiranja korisnika o svim temama iz svakodnevnog života, okupiti što veću zajednicu ljudi koji žele kao i mi mjenjati procese na bolje te na taj način inspirirati i druge na promjenu paradigme „crnog“ na „moguće je“.{"\n"} Mi se podjednako obraćamo svima onima koji žele odmak od negativnih informacija i koji žele uživati u kvalitetnom sadržaju, zabavnog i opuštajućeg karaktera.{"\n"}{"\n"}
                Cilj nam je da korisnici posjete naš portal, društvenu mrežu ili uzmu svoj tiskani besplatan primjerak Superinfa, da ga odnesu kući, pročitaju i zadrže u svojoj obitelji te da prenesu tu dobru i pozitivnu energiju kako u krugu svojih najmilijih tako i na svoju okolinu.{"\n"}{"\n"} Superinfo preko tiskanog izdanja trenutno pokriva 23 općine i grada u ZDK i SBK.{"\n"}{"\n"}
                Uz rubrike Fokus koja donosi vijesti iz dva kantona, tu su Shopping, Život +, Majka i dijete, Dom i vrt, Scena, Sport, Gastro, Lifestyle, Auto&tech .{"\n"}{"\n"}
                Mi smo nastavili stari projekat, ali možemo reći da je to stari projekat u novom ruhu.{"\n"} U tom smislu smo okupili mlad, perspektivan i stručan tim koji se prihvatio zahtjevnog posla što će naši čitaoci sigurni smo prepoznati i cijeniti.
                </Text>
                <View style={styles.kontainerSlike2} >
                    <Image style={styles.slika2} source = {require("../assets/images/zdenko.jpg")} />
                </View>
                <Text style={styles.ostalitext}>
                {"\n"}
                Zdenko Kolak,{"\n"}{"\n"}
                kreativni tim Superinfa i agencije Vitera
                </Text>
            </View>
            </ScrollView>
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


export default Onama;