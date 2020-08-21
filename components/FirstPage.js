import * as React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator,AppState } from 'react-native';
import Objava from './Objava.js'
import PocetnaObjava from "./PocetnaObjava.js"


class FirstPage extends React.Component{

    state={
        posts: [],
        isLoading: false,
        categories: 6,
        allcategories: [6,5,9,2,3,10,31,7,8],
        count: 0,
        categoryName: "Fokus",
        appState: AppState.currentState,
        isGetPostRuning: false,
    };

    handleCategoryName(cat){
        switch(cat){
            case 6:
                return <Text style={{letterSpacing: 10}}> Fokus </Text>;
            case 5:
                return <Text style={{color:"#4C8DC3",letterSpacing: 10,}}>Život+</Text>;
            case 9:
                return <Text style={{color:"#75ABAD",letterSpacing: 10}}>Sport</Text>;
            case 2:
                return <Text style={{color: "#A8795D",letterSpacing: 10}}>Majka i dijete</Text> ;
            case 3:
                return<Text style={{color: "brown",letterSpacing: 10}}>Dom i vrt</Text> ;
            case 31:
                return <Text style={{color: "green",letterSpacing: 10}}>Eco</Text>;
            case 7:
                return <Text style={{color: "#DF5286",letterSpacing: 10}}>Scena</Text> ;
            case 10:
                return<Text style={{color: "#A0A028",letterSpacing: 10}}>Gastro</Text>;
            case 8:
                return <Text style={{color: "purple",letterSpacing: 10}}>Lifestyle</Text> ;
            default:
                return "Fokus";                            
        }
    }

    handleCateogryStringName(cat){
        switch(cat){
            case 6:
                return "Fokus";
            case 5:
                return "Život+";
            case 9:
                return "Sport";
            case 2:
                return "Majka i dijete" ;
            case 3:
                return "Dom i vrt" ;
            case 31:
                return "Eco";
            case 7:
                return "Scena";
            case 10:
                return "Gastro";
            case 8:
                return "Lifestyle" ;
            default:
                return "Fokus";                            
        }


    }

     getPosts2 = async() => {
         if(this.state.count <= this.state.allcategories.length -1){
            const response = await fetch(
                `https://superinfo.ba/wp-json/wp/v2/posts?categories=${this.state.categories}&per_page=5&page=1`,
              )
              const data = await response.json();
              this.setState({posts:  [...this.state.posts, ...data], isLoading: false, isGetPostRuning:true})
              this.handleCategories();

         }else{
             return this.setState({isGetPostRuning: false});
         }

     }

     handleCategories = () => {
         this.setState({
            count: this.state.count + 1,
         },
         () => this.handleCat()

         )
     }

     handleCat = () => {
        this.setState(
            {
              categories: this.state.allcategories[this.state.count],
            }, () => this.getPosts2());
     }

    componentDidMount(){
        AppState.addEventListener("change", this._handleAppStateChange);
        this.getPosts2();
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
      }

    _handleAppStateChange = nextAppState => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === "active" && this.state.isGetPostRuning === false
        ) {
            this.setState({posts:[],count:0,categoryName: "Fokus",categories: 6,},() => this.getPosts2());
        }
        this.setState({ appState: nextAppState });
      };
  


    render(){

        return(
            this.state.posts.length === 0 ?
            <View
                style={{
                    flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
                }}
              >
                <ActivityIndicator animating size="large" />
              </View> :
               <View style={styles.test}>
                    <FlatList
                    refreshing={this.state.isLoading}
                    onEndReachedThreshold={0.1}
                    data={this.state.posts}
                    keyExtractor={(item,index) => item.id  + "a" + index}
                    renderItem={({item,index} ) =>
                        <View>
                            { index % 5 === 0 ? <View><Text style={styles.category}>  {this.handleCategoryName(item.categories[0])} </Text>
                            <PocetnaObjava link={item.link} category={this.handleCateogryStringName(item.categories[0])} navigation={this.props.navigation} content={item.content.rendered} date={item.date_gmt} title={item.title.rendered} image={item.jetpack_featured_media_url}  /></View>
                             :
                             <Objava link={item.link} category={this.handleCateogryStringName(item.categories[0])} navigation={this.props.navigation} content={item.content.rendered} date={item.date_gmt} title={item.title.rendered} image={item.jetpack_featured_media_url}/> }
                        </View>
                             }  />
                </View>

        )
    }
}

const styles = StyleSheet.create({
    category: {
        fontSize: 23,
        // fontWeight: "bold",
        fontStyle: "italic",
        marginTop: "2%",
        color: "red",
        marginBottom: "4%",
        width:"95%",
        textAlign: "center"
     },
        line: {
            height: 1,
            width: "100%",
            backgroundColor: "#CED0CE",
            marginBottom: "2%",
            alignSelf: "center",

        }

})

export default FirstPage;