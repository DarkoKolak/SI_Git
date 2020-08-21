import React from 'react';
import {Linking} from 'react-native';
import GlobalVariables from "../constants/GlobalVariables.js";
import { WebView } from 'react-native-webview';

class Posts extends React.Component{
    

    render(){
        
        const html = ` <head><meta name="viewport" content="width=device-width, initial-scale=1"> </head><style> img { min-width: 98%; max-width: 98%; height: auto; margin: 1% }
         iframe {display: block; max-width: 100%; height: 250;}
          table {display: block; width: 100% !important; max-width: 100% !important; height: auto; margin: 1%}</style>
          <div><img style= width: 100%; height: 200  src=${GlobalVariables.image}/></div> ${GlobalVariables.content} `
        return(
      <WebView
      allowsFullscreenVideo={true} 
      ref={(ref) => { this.webview = ref; }}
       style={{ height: "100%", width: "100%", resizeMode: 'cover', flex: 1 }}
         source={{html: html}}
        scalesPageToFit={false}
        onShouldStartLoadWithRequest={request => {
          Linking.openURL(request.url);
        }}
        onNavigationStateChange={(event) => {
          if (event.url !== "about:blank") {
            alert(event);
            this.webview.stopLoading();
            Linking.openURL(event.url);
            }
        }}
      />
        )
    }
}


export default Posts;