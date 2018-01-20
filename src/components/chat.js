import React, {Component} from 'react';
import {connect} from 'react-redux';
import Iconwassim from 'react-native-vector-icons/Feather';
import FontAwesome, {Icons} from 'react-native-fontawesome';
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
            friend: this.props.friend,

        };

        this.props.set_user(this.props.userName);
        this.chatRef = this.getRef().child('chat/' + this.generateChatId());
        this.chatRefData = this.chatRef.orderByChild('order');
        this.onSend = this.onSend.bind(this);
        this.onPressButtonEmoji = this.onPressButtonEmoji.bind(this);

    }

    generateChatId(friend) {
        if (friend)
        if (this.props.thisUser.id > friend.id)
            return `${this.props.thisUser.id}-${friend.id}`;
        else
            return `${friend.id}-${this.props.thisUser.id}`;
        else return '--';
    }

    getRef() {
        return firebase.database().ref();
    }

    listenForItems(chatRef) {
        chatRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                var avatar = 'https://www.gravatar.com/avatar/'
                // var name = child.val().uid == this.user.id ? this.user.name: this.friend.name
                items.push({
                    _id: child.val().createdAt,
                    text: child.val().text,
                    createdAt: new Date(child.val().createdAt),
                    user: {
                        _id: child.val().uid,
                        avatar: avatar
                    }
                });
            });

            this.setState({
                loading: false,
                messages: items
            })


        });
    }

    componentDidMount() {
        this.listenForItems(this.chatRefData);
    }
    componentWillMount(){
        this.setState({friend:this.props.friend});
    }
    componentWillReceiveProps(nextProps){
        this.chatRefData.off();
        this.chatRef = this.getRef().child('chat/' + this.generateChatId(nextProps.friend));
        this.chatRefData = this.chatRef.orderByChild('order');
        this.listenForItems(this.chatRefData);
    }

    componentWillUnmount() {
        this.chatRefData.off()
    }


    onPressButtonEmoji = () => {

        this.setState({
            emojiShow: !this.state.emojiShow
        })
    };

    onSend(messages = []) {

        // this.setState({
        //     messages: GiftedChat.append(this.state.messages, messages),
        // });
        messages.forEach(message => {
            var now = new Date().getTime()
            this.chatRef.push({
                _id: now,
                text: message.text,
                createdAt: now,
                uid: this.props.thisUser.id,
                order: -1 * now
            })
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

                <Iconwassim name="navigation" size={30} color="#238AC5"/>

            </Send>
        );
    }


    renderBubble(props) {
        return ( <Bubble {...props}
                         wrapperStyle={{
                             left: {
                                 backgroundColor: '#CFD8DC',
                             },
                             right: {
                                 backgroundColor: '#238AC5'
                             }
                         }}/>);
    }

    renderComposer(props) {
        return (
            <View style={[styles.containerShadow, {backgroundColor: '#EEEEEE'}]}>
                <Composer {...props} placeholder={'رسالة جديدة'}
                          textInputStyle={{alignSelf: 'stretch', paddingLeft: 10, paddingRight: 10, marginRight: 0}}/>
            </View>);
    }


    renderInputToolbar(props) {
        return (
            <InputToolbar {...props}
                          containerStyle={[{
                              flex: 1,
                              backgroundColor: '#FFF',
                              borderColor: '#000',
                              borderWidth: 1,
                              borderTopColor: 'transparent',

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
        this.props.set_user(this.props.userName);
        this.props.search_friend(this.props.thisUser);
    };


    logOut = () => {
        this.props.set_user(this.props.userName);
        this.chatRef.remove();

    };
    getTheChat = () => {
        if (this.props.chatting && !this.props.loading) {
            return (
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
                            _id: this.props.thisUser.id
                        }}
                        onInputTextChanged={(txt) => this.setState({text: txt})}
                    />

                    {this.getEmoji()}
                </View>
            );
        }
        else return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#238AC5', fontSize: 25}}>{this.props.error}</Text>
                {this.getSpinner(this.props.loading)}
            </View>
        );
    }

    getSpinner(x) {
        if (x) return <Spinner size="large" color='#238AC5'/>;
    }

    getTheMainView = () => {
        if (this.state.loading) return (
            <ImageBackground source={require('../../assets/back3.png')} style={{flex: 1}}> <View
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Spinner
                color='#238AC5'/></View></ImageBackground>);
        else return (
            <ImageBackground source={require('../../assets/back3.png')} style={{flex: 1}}>
                {this.getTheChat()}
            </ImageBackground>
        );

    }

    goback() {

    }

    ban() {

    }

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: '#238AC5'}} androidStatusBarColor="#238AC5">
                    <Grid >
                        <Col size={1}>
                            <TouchableOpacity onPress={this.logOut}
                                              style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
                                <Text style={[{fontSize: 22, color: '#FFF'}]}>
                                    <FontAwesome>{Icons.chevronLeft}</FontAwesome>
                                </Text>
                            </TouchableOpacity>
                        </Col>
                        <Col size={3}>
                            <TouchableOpacity onPress={this.logOut}
                                              style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
                                <Text style={[{fontSize: 22, color: '#FFF'}]}>
                                    {this.props.friend.name}
                                </Text>
                            </TouchableOpacity>
                        </Col>

                        <Col size={1}>
                            <TouchableOpacity onPress={this.goback}
                                              style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
                                <Text style={[{fontSize: 22, color: '#FFF'}]}>
                                    <FontAwesome>{Icons.ban}</FontAwesome>
                                </Text>
                            </TouchableOpacity>
                        </Col>
                        <Col size={1}>
                            <TouchableOpacity onPress={this.serchForFriend}
                                              style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
                                <Text style={[{fontSize: 22, color: '#FFF'}]}>
                                    <FontAwesome>{Icons.share}</FontAwesome>
                                </Text>
                            </TouchableOpacity>
                        </Col>

                    </Grid>

                </Header>
                {this.getTheMainView()}

            </Container>

        );
    }
};


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
    const {thisUser, messages, chatting, friend, error, loading} = chat;
    return {
        thisUser, messages, chatting, friend, error, loading
    }
};

export default connect(mapStateToProps, actions)(Chat);