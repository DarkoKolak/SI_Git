import * as React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator,AppState } from 'react-native';
import Objava from './Objava.js'
import PocetnaObjava from "./PocetnaObjava.js"


class Fokus extends React.Component{

    state={
        posts: [],
        isLoading: false,
        page: 1,
        appState: AppState.currentState
    };

    closeControlPanel = () =>{
      this._drawer.close()
    };
    openControlPanel = () => {
      this._drawer.open()
    };


    checkifnew = (data,posts) =>{
      let newest = [];
      for(let i = data.length-1; i >= 0;i--){
        if(data[i].date > posts.date ){
          newest.unshift(data[i]);
        } 

      }
      if(newest.length > 0){
        this.setState({posts: [...newest, ...this.state.posts],isLoading: false })
      }else{
        this.setState({isLoading: false})
      }
    }

    onRefresh() {
        this.setState({ isLoading: true }, function() { this.getnewestPosts() 
       });
     }

     getnewestPosts = async() => {
      let page = this.state.page;
      const response = await fetch(
        `https://superinfo.ba/wp-json/wp/v2/posts?categories=6&per_page=30&page=1`,
      )
      const data = await response.json();
      this.checkifnew(data,this.state.posts[0]);
   }

    getPosts = async() => {
        let page = this.state.page;
        const response = await fetch(
          `https://superinfo.ba/wp-json/wp/v2/posts?categories=6&per_page=10&page=${page}`,
        )
        const data = await response.json();
        this.setState({posts: page === 1 ? data : [...this.state.posts, ...data], isLoading: false})
        
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
        if (this.state.isLoading) return null;
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
            this.setState({posts:[],page: 1},() => this.getPosts());
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

                <View style={styles.container}>
                <FlatList
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isLoading}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={1}
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
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      width:"100%",
    },

});

export default Fokus;