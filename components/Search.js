import React from "react";
import { StyleSheet, Text, View, Keyboard, FlatList, ActivityIndicator } from 'react-native';
import {Context} from "./Context.js";
import Objava from './Objava.js'
import PocetnaObjava from "./PocetnaObjava.js"



class Search extends React.Component{

    state={
        posts: [],
        isLoading: false,
        page: 1,
        text: "",
        currentStateOfSearch: "",
        noMoreContent: false,
    };

    getPosts = async(value) => {
        let page = this.state.page;
        const response = await fetch(
          `https://superinfo.ba/wp-json/wp/v2/posts?search=${value}&categories=6&per_page=10&page=1`,
        )
        const data = await response.json();

        if(!Array.isArray(data)){
         return this.setState({isLoading: false, noMoreContent: true})
          
        }
        this.setState({posts: data , isLoading: false, noMoreContent: false})
     }

     getPosts2 = async(value) => {
      let page = this.state.page;
      const response = await fetch(
        `https://superinfo.ba/wp-json/wp/v2/posts?search=${value}&categories=6&per_page=10&page=${page}`,
      )
      const data = await response.json();

      if(!Array.isArray(data)){
        return this.setState({isLoading: false, noMoreContent: true})
         
       }
      this.setState({posts: page === 1 ? data : [...this.state.posts, ...data], isLoading: false, noMoreContent: false})
   }

     handleLoadMore = (value) => {
        this.setState(
          {
            page: this.state.page + 1,
          },
          () => {
            this.getPosts2(value);
          },
        );
      };

      renderFooter = () => {
        if (this.state.isLoading) return null;
          if(this.state.noMoreContent === true){
             return (<View
            style={{
              paddingVertical: 20,
            }}
          >
            <Text style={{fontSize: 17, textAlign: "center"}}>Nemamo više rezultata na vaše pretraživanje </Text>
          </View>)
          }else{
            return(
              <View
              style={{
                paddingVertical: 20,
              }}
            >
              <ActivityIndicator animating size="large" />
            </View>
            )
          }
      };


      renderResult = (value) =>{

        if(value !== this.state.currentStateOfSearch){
          this.getPosts(value);
          this.setState({currentStateOfSearch: value});
          return(
            this.state.posts.length === 0 ?
            this.state.isLoading === false &&
            <View
                style={{
                    flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "white"
                }}
              ><Text style={{textAlign: "center", marginTop: "50%"}}>Nemamo rezultata na vaše pretraživanje</Text></View>  :

              <View style={styles.container}>
              <FlatList
              onEndReached={() => this.handleLoadMore(value)}
              onEndReachedThreshold={0.1}
              style= {{paddingTop: 20}}
              data={this.state.posts}
              keyExtractor={item => item.id + "a"}
              ListFooterComponent={this.renderFooter}
              renderItem={({item,index} ) =>
              <View>
                  {index===0? <PocetnaObjava link={item.link} navigation={this.props.navigation} content={item.content.rendered}
                   date={item.date_gmt} title={item.title.rendered} image={item.jetpack_featured_media_url}  />   :  
                   <Objava link={item.link} navigation={this.props.navigation} content={item.content.rendered}
                   date={item.date_gmt} title={item.title.rendered} image={item.jetpack_featured_media_url}  /> }
              </View>
                  }  />
          </View>
          )

        }else{

          return(
            this.state.posts.length === 0 ?
            <View
                style={{
                    flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "white"
                }}
              >
                <Text>Nemamo rezultata na vaše pretraživanje</Text>
              </View> :
  
              <View style={styles.container}>
              <FlatList
              onEndReached={() => this.handleLoadMore(value)}
              onEndReachedThreshold={0.7}
              style= {{paddingTop: 20,marginBottom:20}}
              data={this.state.posts}
              keyExtractor={item => item.id + "Search"}
              ListFooterComponent={this.renderFooter}
              renderItem={({item,index} ) =>
              <View>
                  {index===0? <PocetnaObjava link={item.link} navigation={this.props.navigation} content={item.content.rendered}
                   date={item.date_gmt} title={item.title.rendered} image={item.jetpack_featured_media_url}  />   :  
                   <Objava link={item.link} navigation={this.props.navigation} content={item.content.rendered}
                   date={item.date_gmt} title={item.title.rendered} image={item.jetpack_featured_media_url}  /> }
              </View>
                  }  />
          </View>
          )
        }

      }

      componentWillUnmount(){

        this.setState({noMoreContent: false})
      }
    render(){
        return(
          <Context.Consumer>
            {data =>{
              return(
                data.searchState === null || data.searchState === undefined || data.searchState === "" ?
                  <Text style={{textAlign: "center", paddingTop: "100%", height: "100%", fontSize: 17, backgroundColor: "white"}}>Upišite temu koju tražite u polje za pretraživanje</Text>
              :
              this.renderResult(data.searchState)
              )


            }}
          </Context.Consumer>
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

 export default Search;