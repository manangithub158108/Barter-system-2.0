import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import { FlatList } from 'react-native';
import { ListItem, Header, Badge } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

export default class HomeScreen extends Component{

    state = {
        allItems : [],
        NotificationCount : 0,
    }

    componentDidMount = () => {
        firestore.collection('Items').onSnapshot((snapshot) => {
            var allItems = snapshot.docs.map((doc) => doc.data());
            this.setState({
                allItems : allItems
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

    renderItem = ({item}) => (
        <ListItem
        title = {item.item_name}
        subtitle = {item.item_description}

        rightElement = {
            <TouchableOpacity onPress = {() => {
                this.props.navigation.navigate('ItemDetails', {
                    'item_details' : item,
                })

                const uid = firebase.auth().currentUser.email;

                firestore.collection('notifications').add({
                    'userID' : uid,
                    'creatorID' : item.creatorFirst_name,
                    'item_name' : item.item_name,
                    'message' : item.creatorFirst_name + ' has viewed the item',
                    'date' : firebase.firestore.FieldValue.serverTimestamp()
                })
            }}>
                <Text> View </Text>
            </TouchableOpacity>
        }
        bottomDivider/>
    )

    render(){
        return(
            <View style = {{ height : '100%'}}>
                <ScrollView>
                <Header
                centerComponent = {
                    <Text style = {{
                        fontSize : 30
                    }}> Home Screen </Text>
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
                <FlatList
               data = {this.state.allItems}
               renderItem = {this.renderItem}/>
                </ScrollView>
            </View>
        )
    }
}