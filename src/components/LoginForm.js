import React, {Component} from 'react';
import {
    Form,
    Item,
    Label,
    Input,
    Button,
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Text,
    Body,
    Grid,
    Row
} from 'native-base';
import {Image,View} from 'react-native';

//import { Font } from 'expo';

class LoginForm extends Component {


    /* componentDidMount() {
       Font.loadAsync({
         'Roboto_medium': require('../../assets/fonts/Roboto-Medium.ttf'),
       });
     }
     */
    render() {
        return (
            <Container>


            <Content>
                            <Image source={require('../../assets/icon.png')}
                                   style={{height: 180, width: 180, flex: 1, alignSelf: 'center'}}/>
                            <Form>
                                <Item floatingLabel style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Label style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>اسم
                                        المستخدم</Label>
                                    <Input/>
                                </Item>
                            </Form>
                            <View>
                            <CardItem header>
                                <Button block primary style={{flex: 1}}>
                                    <Text>دخول</Text>
                                </Button>
                            </CardItem>
                            <CardItem header>
                                <Button block info style={{flex: 1}}>
                                    <Text>دخول كمجهول</Text>
                                </Button>
                            </CardItem>
                            </View>
            </Content>
            </Container>
        );
    }
}


export default LoginForm;
