import * as React from 'react';
import {View, FlatList, ActivityIndicator,AppState } from 'react-native';
import Objava from './Objava.js';
import GlobalVariables from "../constants/GlobalVariables.js"
import PocetnaObjava from "./PocetnaObjava.js"


class CategoryApi extends React.Component{

    state={
        posts: [],
        isLoading: false,
        page: 1,
        isRefresing: false,
        appState: AppState.currentState
    };

    checkifnew = (data,posts) =>{
      let newest = [];
      for(let i = data.length-1; i >= 0;i--){
        if(data[i].date > posts.date ){
          newest.unshift(data[i]);
        } 

      }
      if(newest.length > 0){
        this.setState({posts: [...newest, ...this.state.posts],isRefresing: false })
      }else{
        this.setState({isRefresing: false})
      }
    }

    onRefresh() {
        this.setState({ isRefresing: true }, function() { this.getnewestPosts() 
       });
     }

     getnewestPosts = async() => {
      let page = this.state.page;
      const response = await fetch(
        `https://superinfo.ba/wp-json/wp/v2/posts?categories=${GlobalVariables.category}&per_page=30&page=1`,
      )
      const data = await response.json();
      this.checkifnew(data,this.state.posts[0]);
   }

    getPosts = async() => {
        let page = this.state.page;
        const response = await fetch(
          `https://superinfo.ba/wp-json/wp/v2/posts?categories=${GlobalVariables.category}&per_page=10&page=${page}`,
        )
        const data = await response.json();
        if(Array.isArray(data)){
          this.setState({posts: page === 1 ? data : [...this.state.posts, ...data], isLoading: false})
        }else{
          this.setState({isLoading: true})
        }
     }

     handleLoadMore = () => {
        this.setState(
          {
            page: this.state.page + 1,
          },
          () => {
            this.getPosts();
          },
        );
      };

      renderFooter = () => {
        if (this.state.isLoading) return <View style={{height:20}}></View>;
        return (
          <View
            style={{
              paddingVertical: 20,
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };

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



    componentDidMount(){
      AppState.addEventListener("change", this._handleAppStateChange);
      this.getPosts();
  }

  componentWillUnmount() {
      AppState.removeEventListener("change", this._handleAppStateChange);
    }

  _handleAppStateChange = nextAppState => {
      if (
        this.state.appState.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
          this.setState({posts:[],page: 1,},() => this.getPosts());
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
              justifyContent: 'center',
              backgroundColor: "white"
              }}
            >
              <ActivityIndicator animating size="large" />
            </View> :

            <View style={{backgroundColor: "white"}}>
            <FlatList
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isRefresing}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={1}
            style= {{paddingTop: 20}}
            data={this.state.posts}
             keyExtractor={item => item.id + "x"}
            ListFooterComponent={this.renderFooter}
            renderItem={({item,index} ) =>
                <View>
                    {index===0? <PocetnaObjava link={item.link} category={this.handleCateogryStringName(item.categories[0])} navigation={this.props.navigation} content={item.content.rendered}
                     date={item.date_gmt} title={item.title.rendered} image={item.jetpack_featured_media_url}  />   :  
                     <Objava link={item.link} category={this.handleCateogryStringName(item.categories[0])} navigation={this.props.navigation} content={item.content.rendered}
                     date={item.date_gmt} title={item.title.rendered} image={item.jetpack_featured_media_url}  /> }
                </View>
                    } />
         </View>

        )
    }
}

export default CategoryApi;