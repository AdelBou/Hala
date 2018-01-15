import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    Text, Image,
    StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ImageBackground
} from 'react-native';
import {
    Fab,
    Spinner,
    Button,
    Body,
    Icon,
    Col,
    Title,
    Container,
    Content,
    Header,
    Left,
    Right,
    Grid,
    Row
} from 'native-base';
import {GiftedChat, Send, Bubble, Composer, InputToolbar, Day} from 'react-native-gifted-chat';
import MyIcon from './myIcon';
import firebase from 'firebase';
import Emoji from './emoji';
import * as actions from '../actions';

require('moment/locale/ar');


class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {

            messages: [],
            user: this.props.user,
            text: '',
            emojiShow: false,
            active: false,
            loading: false,
            serchingFor: true,
            visible: true,
            chatting: false,
            friend: null,

        };

        this.onPressButtonEmoji = this.onPressButtonEmoji.bind(this);
    }


    componentDidMount() {
        this.props.set_user(this.props.userName);
        /*
        let user = firebase.auth().currentUser;
        let theUserToPush = {
            id: user.uid,
            connected: true,
            searchingForFriend: true,
            name: this.props.userName,
            chattingWith: null,
        };
        this.setState({
            user: theUserToPush,
        });
/*
        firebase.database().ref(`/users/${theUserToPush.id}`).limitToFirst(1).on(
            'value', snapshot => {
                 let x=null ;
                snapshot.forEach(function (childSnapshot) {
                    x=childSnapshot.val().chattingWith;
                });

                if (x) {
                    firebase.database().ref(`/users/${x}`).on('value', snapshot => {
                        this.setState({
                            friend: snapshot.val(),
                            chatting: true,
                        })
                    })
                }
                else
                    {
                        firebase.database().ref(`/users/${theUserToPush.id}`).set(
                            theUserToPush
                        );
                          this.setState({
                            friend: null,
                            chatting: false,
                        })

                    }
                }
            );
*/

        /*  this.setState({
              messages: [
                  {
                      _id: 1,
                      text: 'يا هلا بالحبايب',
                      createdAt: new Date(),
                      user: {
                          _id: 2,
                          name: 'React Native',
                          avatar: 'https://facebook.github.io/react/img/logo_og.png',
                      },
                  },
              ],
          });*/
        //recupérer les messgaes // ???

    }

    componentWillUnmount() {
        //Couper la connexion// ???
        // this.chatRefData.off()

    }

    /*
        // initier la connexion
        startTheChatWith=()=> {
            firebase.database().ref(`/users/${this.state.user.id}/chanttingWith`).set(
                this.state.friend.id
            );

            firebase.database().ref(`/users/${this.state.friend.id}/chanttingWith`).set(
                   this.state.user.id
            );
            this.chatRef = this.getRef().child('chat/' + this.generateChatId());
            this.chatRefData = this.chatRef.orderByChild('order');
            this.onSend = this.onSend.bind(this);
        }

        generateChatId() {
            if (this.state.user.id > this.state.friend.id)
                return `${this.state.user.id}-${this.state.friend.id}`;
            else
                return `${this.state.friend.id}-${this.state.user.id}`
        }

        getRef() {
            return firebase.database().ref();
        }
    */

    /*
        listenForItems(chatRef) {
            chatRef.on('value', (snap) => {
                // get children as an array
                var items = [];
                snap.forEach((child) => {
                    var name = child.val().id == this.state.user.id ? this.state.user.name : this.state.friend.name;
                    items.push({
                        _id: child.val().createdAt,
                        text: child.val().text,
                        createdAt: new Date(child.val().createdAt),
                        user: {
                            _id: child.val().uid,
                        }
                    });
                });

                this.setState({
                    loading: false,
                    messages: items
                })
            });
        }*/


    onSend(messages = []) {

        this.setState({
            messages: GiftedChat.append(this.props.messages, messages),
        });
        /*
                messages.forEach(message => {
                    var now = new Date().getTime();
                    this.chatRef.push({
                        _id: now,
                        text: message.text,
                        createdAt: now,
                        uid: this.user.uid,
                        order: -1 * now
                    })
                })*/

    }

    onPressButtonEmoji = () => {

        this.setState({
            emojiShow: !this.state.emojiShow
        })
    };


    renderEmoji = () => {
        return (
            <TouchableOpacity style={[styles.containerShadow, {
                width: 45,
                height: 300,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }]}
                              onPress={this.onPressButtonEmoji}
            >
                <MyIcon type={'emoji'}
                        style={{fontSize: 30, color: '#238AC5'}}/>
            </TouchableOpacity>

        );
    }

    onPressEmoji = (emoji) => {
        // let adel=this.state.messages[1].text ;


        this.setState({
                text: this.state.text + emoji
            }
        )
    };


    getEmoji() {
        if (this.state.emojiShow) {
            return (<View style={[styles.containerShadow, {
                paddingRight: 7,
                paddingLeft: 5,
                flex: 1,
                backgroundColor: '#FFF',
                marginBottom: 5
            }]}><Emoji
                OnPressEmoji={(emoji) => this.onPressEmoji(emoji)}/></View>);
        }
        else return null;

    }


    renderSend(props) {
        return (
            <Send
                {...props}
                containerStyle={[styles.containerShadow, {
                    width: 40,
                    maxWidth: 40,
                    height: 35,
                    maxHeight: 45,
                    padding: 0,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }]}>

                <MyIcon type={'send'}
                        style={{fontSize: 30, color: '#238AC5'}}/>

            </Send>
        );
    }


    renderBubble(props) {
        return ( <Bubble {...props}
                         wrapperStyle={{
                             left: {
                                 backgroundColor: 'white',
                             },
                             right: {
                                 backgroundColor: '#238AC5'
                             }
                         }}/>);
    }

    renderComposer(props) {
        return (
            <View style={styles.containerShadow}>
                <Composer {...props} placeholder={'رسالة جديدة'}
                          textInputStyle={{alignSelf: 'stretch', padding: 0, marginRight: 0}}/>
            </View>);
    }


    renderInputToolbar(props) {
        return (
            <InputToolbar {...props}
                          containerStyle={[{
                              flex: 1,
                              backgroundColor: 'transparent',
                              borderWidth: 0,
                              borderTopColor: 'transparent'
                          }]}
                          primaryStyle={[, styles.containerShadow, {
                              flex: 1,
                              paddingBottom: 10,
                              borderWidth: 0, backgroundColor: 'transparent',
                              justifyContent: 'center',
                              alignItems: 'center'
                          }]}/>
        );
    }

    renderDay(props) {
        return (
            <Day {...props}
                 textStyle={{color: '#FFF'}}
            />
        );
    }

    serchForFriend = () => {
        this.props.search_friend(this.props.thisUser);
    };


    logOut = () => {
    };
    getTheChat = () => {
        if (this.props.chatting) {
            return (
                <View style={{flex: 1}}>
                    <GiftedChat
                        messages={this.props.messages}
                        renderSend={this.renderSend}
                        onSend={(messages) => this.onSend(messages)}
                        renderAccessory={this.renderEmoji}
                        renderComposer={this.renderComposer.bind(this)}
                        renderInputToolbar={this.renderInputToolbar.bind(this)}
                        text={this.state.text}
                        renderBubble={this.renderBubble.bind(this)}
                        renderDay={this.renderDay.bind(this)}
                        locale={'ar'}
                        user={{
                            _id: 1,
                        }}
                        onInputTextChanged={(txt) => this.setState({text: txt})}
                    />

                    {this.getEmoji()}
                </View>
            );
        }
        else return null;
    }

    getTheMainView = () => {
        if (this.state.loading) return (
            <ImageBackground source={require('../../assets/back.png')} style={{flex: 1}}> <View
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Spinner
                color='#238AC5'/></View></ImageBackground>);
        else return (
            <ImageBackground source={require('../../assets/back3.png')} style={{flex: 1}}>
                {this.getTheChat()}
                <Fab
                    active={this.state.active}
                    direction="right"
                    containerStyle={{}}
                    style={{backgroundColor: '#238AC5', top: 5}}
                    position="topLeft"
                    onPress={() => {
                        this.setState({active: !this.state.active});

                    }}>

                    <MyIcon type={'menu'}/>

                    <Button style={{backgroundColor: '#34A34F', marginTop: 5}} onPress={this.serchForFriend}>
                        <MyIcon type={'change'}/>
                    </Button>
                    <Button style={{backgroundColor: '#E53935', marginTop: 5}} onPress={this.logOut}>
                        <MyIcon type={'logout'}/>
                    </Button>
                </Fab>
            </ImageBackground>
        );

    }

    render() {
        return (
            <Container>
                <Header>
                    <Grid style={{paddingTop: 18}}>
                        <Col>
                            <Title>{this.props.thisUser.name} </Title>
                        </Col>
                        <Col>
                            <Title>شات</Title>
                        </Col>
                        <Col>
                            <Title> {this.props.friend?this.props.friend.name:''} </Title>

                        </Col>
                    </Grid>

                </Header>
                {this.getTheMainView()}

            </Container>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        marginRight: 10,
        marginLeft: 10,

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    containerShadow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: '#FFF',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    }
});

const mapStateToProps = ({chat}) => {
    /*
    return { messages:chat.messages,
        friend:chat.friend,
        searchingForFriend:chat.searchingForFriend,
        connected:chat.connected,
        chatting:chat.chatting,
        error:chat.error,
        user:chat.thisUser
    };*/
    const {thisUser, messages,chatting,friend} = chat;
    return {
        thisUser, messages ,chatting ,friend
    }
};

export default connect(mapStateToProps, actions)(Chat);