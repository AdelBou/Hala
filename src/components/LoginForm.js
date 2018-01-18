import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {userChanged, loginUser, loginAnonymousUser} from '../actions';
import {
    Form,
    Item,
    Label,
    Input,
    Button,
    Container,
    Header,
    Thumbnail,
    Content,
    Card,
    CardItem,
    Text,
    Body,
    Spinner
} from 'native-base';
import {Image, View, ImageBackground, ScrollView} from 'react-native';
import {Sae} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


class LoginForm extends Component {


    onUserChange(text) {
        this.props.userChanged(text);
    }


    render() {

        return (
            <ImageBackground style={{flex:1}} source={require('../../assets/back3.png')}>
                    
                    <View style={styles.containerStyle} >
                        <View style={{flex: .3}}>
                            <Button block
                                    style={{backgroundColor: 'transparent', alignSelf: 'flex-start'}}
                                    onPress={() => {
                                        Actions.emailUs();
                                    }}>
                                <Icon name="help-circle" size={30} color="#238AC5"/>
                            </Button>
                        </View>

                        <Thumbnail square
                                   source={require('../../assets/icon.png')}
                                   style={{width: 150, height: 150, alignSelf: 'center'}}/>
                        {this.renderButton()}
                        <View style={{flex: .3}}/>

                    </View >
            </ImageBackground>


        )
            ;
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" color='#238AC5'/>;
        }
        return (
            <View style={styles.containerStyle}>
                <View>
                    <Sae
                        label="اسم الستخدم"
                        iconClass={Icon}
                        iconName={'user'}
                        iconColor='#238AC5'
                        labelStyle={{color: '#666'}}
                        inputStyle={{color: '#333'}}
                        onChangeText={this.onUserChange.bind(this)}
                        value={this.props.userName}/>

                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>

                    <Button block
                            style={{backgroundColor: '#238AC5', borderRadius: 30}}
                            onPress={() => {
                                const {userName} = this.props;
                                this.props.loginUser({userName});
                            }}>
                        <Icon name="log-in" size={20} color="#fff"/>
                        <Text style={{fontSize: 20}}>دخول</Text>
                    </Button>

                </View>
                <View style={{borderColor: '#ccc', borderWidth: 1}}/>
                <Button block
                        style={{backgroundColor: 'white', borderColor: '#238AC5', borderWidth: 1, borderRadius: 50}}
                        onPress={() => {
                            this.props.loginAnonymousUser();
                        }}>
                    <FontAwesome name="user-secret" size={20} color="#238AC5"/>
                    <Text style={{color: '#238AC5', fontSize: 20}}>دخول كمجهول</Text>
                </Button>

            </View>);
    }
}


const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    inputStyle: {
        fontSize: 20,
        color: 'red',
        alignSelf: 'center'
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        padding: 20
    },


};

const mapStateToProps = ({auth}) => {

    const {userName, loading, error} = auth;
    return {userName, loading, error};
};

export default connect(mapStateToProps, {
    userChanged, loginUser, loginAnonymousUser
})(LoginForm);
  


