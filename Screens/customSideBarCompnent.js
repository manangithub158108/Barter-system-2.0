import firebase from 'firebase';
import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import {Text, View} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';


export default class customSideBarComponent extends Component{
    render(){
        return(
            <View>
                <DrawerItems {...this.props}>

                </DrawerItems>
                <View>
                    <TouchableOpacity onPress = {() => {
                        firebase.auth().signOut();
                    }}>
                        <Text> Logout ---{'>'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}