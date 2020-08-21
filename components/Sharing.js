import React from "react";

import {Share,Text,TouchableOpacity} from "react-native";

import { Ionicons } from '@expo/vector-icons';

class Sharing extends React.Component{


    click = () => {
        Share.share({
          message: `${this.props.title} ${this.props.link}`,
          url: this.props.link,
          title: this.props.title
        }, {
          // Android only:
          dialogTitle: 'Članak superinfo.ba',
        })
      }

    render(){
        return(
          <TouchableOpacity onPress={this.click} style={{flexDirection: "row",marginRight: 10,}}>
            <Text style={{fontSize: 20, color: "white",marginRight: 6}}>Podijeli članak</Text>
            <Ionicons color="white" size={22} style={{marginTop: 3}} name="md-share-alt" />
          </TouchableOpacity>
        )
    }
}


export default Sharing;