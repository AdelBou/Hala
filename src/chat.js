import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {Fab, Button, Body, Icon, Col, Title, Container, Content, Header, Left, Right, Grid, Row} from 'native-base';
import {GiftedChat} from 'react-native-gifted-chat';
import MyIcon from './components/myIcon';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            name_dest: 'bob',
            myname: 'adel',
            active: false
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
    }


    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));

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
                </Fab>

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