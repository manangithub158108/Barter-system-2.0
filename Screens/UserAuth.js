import React, {Component} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import { ScrollView } from 'react-native';

export default class UserAuth extends Component{

    state = {
        isButtonPressed : false,
        loginEmail : '',
        loginPassword : '',
        SignupEmail : '',
        SignupPassword : '',
        first_name : '',
        last_name : '',
        address : '',
        
    }

    loginFunction = async() => {
        const login = await firebase.auth().signInWithEmailAndPassword(
            this.state.loginEmail, this.state.loginPassword
        )
        if(login){
            alert('User logged in successfully');
            this.props.navigation.navigate('HomeScreen');
        }
    }

    SignupFunction = async() => {
        const Signup = await firebase.auth().createUserWithEmailAndPassword(
            this.state.SignupEmail, this.state.SignupPassword
        )
        if(Signup){
            firestore.collection('users').add({
                'first_name' : this.state.first_name,
                'last_name' : this.state.last_name,
                'address' : this.state.address,
                'email' : this.state.SignupEmail,
            })
            alert('User Signed up successfully');
        }
    }


  render(){
      if(this.state.isButtonPressed === false){
        return(
            <View style = {{backgroundColor : '#222831', height : '100%'}}>

                <Image source = {require('../Images/Auth.jpg')} style = {{
                    width : 200,
                    height : 200,
                    alignSelf : 'center',
                    marginBottom : 30,
                    marginTop : 30,
                    borderRadius : 40
                }}></Image>

                <TextInput onChangeText = {(text) => {
                    this.setState({
                        loginEmail : text
                    })
                }} placeholder = {'Enter email'} style = {style.loginEmail}></TextInput>

                <TextInput onChangeText = {(text) => {
                    this.setState({
                        loginPassword : text
                    })
                }} placeholder = {'Enter password'} secureTextEntry = {true} style = {style.textInput}></TextInput>

                <TouchableOpacity onPress = {()=> {
                    this.loginFunction();
                }}>
                    <Text style = {style.loginButton}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress = {() => {
                    this.setState({
                        isButtonPressed : true
                    })
                }}>
                    <Text style = {style.button}> Signup </Text>
                </TouchableOpacity>
            </View>
          )
      }else{
        return(
            <Modal
            animationType = {'slide'}
            visible = {true}
            style = {{height : '100%', width : '100%', alignSelf : 'center', backgroundColor : '#222831'}}>
                <ScrollView>
                <View>
                <TextInput onChangeText = {(text) => {
                    this.setState({
                        first_name : text
                    })
                }} placeholder = {'Enter first name'} style = {style.textInput}></TextInput>

                <TextInput onChangeText = {(text) => {
                    this.setState({
                        last_name : text
                    })
                }} placeholder = {'Enter last name'} style = {style.textInput}></TextInput>

                <TextInput onChangeText = {(text) => {
                    this.setState({
                        address : text
                    })
                }} placeholder = {'Enter address'} style = {style.address} multiline = {true}></TextInput>

                <TextInput onChangeText = {(text) => {
                    this.setState({
                        SignupEmail : text
                    })
                }} placeholder = {'Enter email'} style = {style.textInput}></TextInput>

                <TextInput onChangeText = {(text) => {
                    this.setState({
                        SignupPassword : text
                    })
                }} placeholder = {'Enter password'} secureTextEntry = {true} style = {style.textInput}></TextInput>

                <TouchableOpacity onPress = {() => {
                    this.SignupFunction();
                }}>
                    <Text style = {style.loginButton}> Register </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress = {() => {
                    this.setState({
                        isButtonPressed : false
                    })
                }}>
                    <Text style = {style.button}> Go back ---{'>'} </Text>
                </TouchableOpacity>

                </View>
                </ScrollView>
            </Modal>
          )
      }
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