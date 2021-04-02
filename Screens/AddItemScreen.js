import firestore from '../config';
import firebase from 'firebase'
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {Header, Badge } from 'react-native-elements';

export default class AddItemScreen extends Component{

    state = {
        currentUserLocation : '',
        currentUserFirst_name : '',
        currentUserLast_name : '',
        item_name : '',
        item_description : '',
        NotificationCount : 0
    }

    addItem = () => {
        firestore.collection('Items').add({
            'item_name' : this.state.item_name,
            'item_description' : this.state.item_description,
            'Status' : 'Unread',
            'creatorFirst_name' : this.state.currentUserFirst_name,
            'creatorLast_name' : this.state.currentUserLast_name,
            'creatorAddress' : this.state.currentUserLocation
        })
        alert('Item added successfully');
    }

    componentDidMount = () => {

        const email = firebase.auth().currentUser.email;

        firestore.collection('users').where('email', '==', email).onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                const user_details = doc.data();
                this.setState({
                    currentUserLocation : user_details.address,
                    currentUserFirst_name : user_details.first_name,
                    currentUserLast_name : user_details.last_name
                })
            })
        })

        const uid = firebase.auth().currentUser.email;

        firestore.collection('notifications').where('userID', '==', uid).onSnapshot((snapshot) => {
            var allNotificationsCount = snapshot.docs.length;
            this.setState({
                NotificationCount : allNotificationsCount
            })
        })

    }

    render(){
        return(
            <View style = {{backgroundColor : '#222831', height : '100%'}}>

                <Header
                centerComponent = {
                    <Text style = {{
                        fontSize : 30
                    }}> Item Details </Text>
                }
                leftComponent = {
                    <TouchableOpacity onPress = {() => {
                        this.props.navigation.openDrawer();
                    }}>
                        <Image source = {require('../Images/hamburger.png')}
                        style = {{
                            width : 30,
                            height : 30,
                            alignSelf : 'flex-start'
                        }}></Image>
                    </TouchableOpacity>
                }
                rightComponent = {
                    <TouchableOpacity onPress = {() => {
                        this.props.navigation.navigate('Notifications');
                    }}>
                        <Image source = {require('../Images/bell.png')}
                        style = {{
                            width : 30,
                            height : 30,
                            alignSelf : 'flex-end'
                        }}></Image>
                        <Badge value = {this.state.NotificationCount}
                        containerStyle = {{position : 'absolute', top : -4, right : -4}}/>
                    </TouchableOpacity>
                }></Header>

                <TextInput onChangeText = {(text) => {
                    this.setState({
                        item_name : text
                    })
                }} placeholder = {'Enter item name'} style = {style.textInput}></TextInput>
                <TextInput onChangeText = {(text) => {
                    this.setState({
                        item_description : text
                    })
                }} placeholder = {'Enter item description'} style = {style.address} multiline = {true}></TextInput>
                <TouchableOpacity onPress = {() => {
                    this.addItem();
                }}>
                    <Text style = {style.button}> Add item </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    textInput : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#eeeeee',
        backgroundColor : '#393e46',
        width : '80%',
        height : 40,
        marginTop : 10,
        marginBottom : 10,
        alignSelf : 'center',
        borderRadius : 30,
        fontSize : 25
    },

    loginEmail : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#eeeeee',
        backgroundColor : '#393e46',
        width : '80%',
        height : 40,
        marginTop : 30,
        marginBottom : 10,
        alignSelf : 'center',
        borderRadius : 30,
        fontSize : 25
    },

    button : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#222831',
        backgroundColor : '#00adb5',
        width : '80%',
        height : 40,
        marginTop : 10,
        marginBottom : 10,
        alignSelf : 'center',
        borderRadius : 30,
        fontSize : 25
    },

    loginButton : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#222831',
        backgroundColor : '#00adb5',
        width : '80%',
        height : 40,
        marginTop : 30,
        marginBottom : 10,
        alignSelf : 'center',
        borderRadius : 30,
        fontSize : 25
    },

    address : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#eeeeee',
        backgroundColor : '#393e46',
        width : '80%',
        height : 150,
        marginTop : 10,
        marginBottom : 10,
        alignSelf : 'center',
        borderRadius : 30,
        fontSize : 25
    }
    
})