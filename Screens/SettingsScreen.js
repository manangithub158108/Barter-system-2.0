import firebase from 'firebase';
import React, {Component} from 'react';
import { Image } from 'react-native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import {Text, View} from 'react-native';
import firestore from '../config';

export default class SettingsScreen extends Component{

    state = {
        currentUserFirst_name : '',
        currentUserLast_name : '',
        currentUserAddress : '',
        currentUserEmail : '',
        docId : '',
        first_name : '',
        last_name : '',
        address : '',
        email : ''
    }

    getUserDetails = () => {

        const currentUserEmail = firebase.auth().currentUser.email;

        firestore.collection('users').where('email', '==', currentUserEmail).get().then((doc) => {
            doc.forEach((snapshot) => {
                const data = snapshot.data();
                this.setState({
                    currentUserEmail : currentUserEmail,
                    currentUserFirst_name : data.first_name,
                    currentUserLast_name : data.last_name,
                    currentUserAddress : data.address,
                    docId : snapshot.id
                })
            })
        })
    }

    componentDidMount = () => {
        this.getUserDetails();
    }

    updateProfile = () => {
        firestore.collection('users').doc(this.state.docId).update({
            'address' : this.state.address,
            'email' : this.state.email,
            'first_name' : this.state.first_name,
            'last_name' : this.state.last_name
        })

        firebase.auth().currentUser.updateEmail(this.state.email);
        
        alert('Your profile has been updated')
    }

    render(){
        return(
            <View style = {{ backgroundColor : '#222831', height : '100%'}}>
                <Image source = {require('../Images/update.png')} style = {{
                    width : 200,
                    height : 200,
                    borderRadius : 40,
                    marginTop : 30,
                    marginBottom : 30,
                    alignSelf : 'center'
                }}></Image>
                <TextInput defaultValue = {this.state.currentUserFirst_name} onChangeText = {(text) => {
                    this.setState({
                        first_name : text
                    })
                }} placeholder = {'Enter first name'} style = {style.textInput}></TextInput>
                <TextInput defaultValue = {this.state.currentUserLast_name} onChangeText = {(text) => {
                    this.setState({
                        last_name : text
                    })
                }} placeholder = {'Enter last name'} style = {style.textInput}></TextInput>
                <TextInput defaultValue = {this.state.currentUserAddress} onChangeText = {(text) => {
                    this.setState({
                        address : text
                    })
                }} placeholder = {'Enter address'} style = {style.address}></TextInput>
                <TextInput defaultValue = {this.state.currentUserEmail} onChangeText = {(text) => {
                    this.setState({
                        email : text
                    })
                }} placeholder = {'Enter email'} style = {style.textInput}></TextInput>
                <TouchableOpacity onPress = {() => {
                    this.updateProfile();
                }}>
                    <Text style = {style.button}> Update profile </Text>
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