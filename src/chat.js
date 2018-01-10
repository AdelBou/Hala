import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
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
import {GiftedChat} from 'react-native-gifted-chat';
import MyIcon from './components/myIcon';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            name_dest: 'bob',
            myname: 'adel',
            active: false,
            loading: true,
            serchingFor: true,
        };
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

        // this.setState({
        //     messages: GiftedChat.append(this.state.messages, messages),
        // });
        messages.forEach(message => {
            var now = new Date().getTime()
            this.chatRef.push({
                _id: now,
                text: message.text,
                createdAt: now,
                uid: this.user.uid,
                order: -1 * now
            })
        })

    }

    getChatView() {
        if (this.state.loading) return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Spinner color='#238AC5'/></View>);
        else return (<View>
            <View style={{flex: 1}}>

                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}/></View>
            <Fab
                active={this.state.active}
                direction="left"
                containerStyle={{}}
                style={{backgroundColor: '#238AC5', top: 50}}
                position="topRight"
                onPress={() => {
                    this.setState({active: !this.state.active});

                }}>

                <MyIcon type={'menu'}/>

                <Button style={{backgroundColor: '#34A34F', marginTop: 50}}>
                    <MyIcon type={'change'}/>
                </Button>
                <Button style={{backgroundColor: '#E53935', marginTop: 50}}>
                    <MyIcon type={'logout'}/>
                </Button>
            </Fab> </View>);

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

    }
})