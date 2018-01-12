import React, {Component} from 'react';

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
import MyIcon from './components/myIcon';
import Emoji from './components/emoji';

require('moment/locale/ar');
export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            name_dest: 'bob',
            myname: 'adel',
            text: '',
            emojiShow: false,
            active: false,
            loading: false,
            serchingFor: true,
            visible: true

        };
        this.onPressButtonEmoji = this.onPressButtonEmoji.bind(this);
    }


    componentWillMount() {
        this.setState({
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
        });
        //recupérer les messgaes // ???
        //this.listenForItems(this.chatRefData);
    }

    componentWillUnmount() {
        //Couper la connexion// ???
        // this.chatRefData.off()
    }

    // initier la connexion
    inistiateTheConnection() {
        this.user = firebase.auth().currentUser
        this.friend = this.props.friend
        this.chatRef = this.getRef().child('chat/' + this.generateChatId());
        this.chatRefData = this.chatRef.orderByChild('order')
        this.onSend = this.onSend.bind(this);
    }

    generateChatId() {
        if (this.user.uid > this.friend.uid)
            return `${this.user.uid}-${this.friend.uid}`;
        else
            return `${this.friend.uid}-${this.user.uid}`
    }

    getRef() {
        return firebase.database().ref();
    }

    listenForItems(chatRef) {
        chatRef.on('value', (snap) => {
            // get children as an array
            var items = [];
            snap.forEach((child) => {
                var name = child.val().uid == this.user.uid ? this.user.name : this.friend.name;
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
    }


    onSend(messages = []) {

        this.setState({
            messages: GiftedChat.append(this.state.messages, messages),
        });
        /* messages.forEach(message => {
             var now = new Date().getTime()
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
    }


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
            return (<View style={[styles.containerShadow, {paddingRight:7,paddingLeft:5,flex: 1, backgroundColor: '#FFF',marginBottom:5}]}><Emoji
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
                <Composer {...props} placeholder={'رسالة جديدة'} textInputStyle={{padding: 0, marginRight: 0}}/>
            </View>);
    }


    renderInputToolbar(props) {
        return (
            <InputToolbar {...props}
                          containerStyle={[{flex: 1, backgroundColor: 'transparent', borderWidth: 0, marginBottom: 10}]}
                          primaryStyle={[{
                              flex: 1,
                              backgroundColor: 'transparent',
                              borderWidth: 0,
                              justifyContent: 'center',
                              alignItems: 'center'
                          }]}/>
        );
    }

    renderDay(props) {
        return (
            <Day {...props}
                          textStyle={{color:'#000'}}
                         />
        );
    }

    getChatView = () => {

        if (this.state.loading) return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Spinner color='#238AC5'/></View>);
        else return (
            <ImageBackground source={require('./../assets/back2.jpg')} style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <GiftedChat
                        messages={this.state.messages}
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

                    <Button style={{backgroundColor: '#34A34F', marginTop: 5}}>
                        <MyIcon type={'change'}/>
                    </Button>
                    <Button style={{backgroundColor: '#E53935', marginTop: 5}}>
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

                            <Title>  {this.state.myname} </Title>

                        </Col>
                        <Col>
                            <Title>شات</Title>
                        </Col>
                        <Col>

                            <Title> {this.state.name_dest} </Title>

                        </Col>
                    </Grid>

                </Header>
                {this.getChatView()}

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
