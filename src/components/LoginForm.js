import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userChanged, loginUser , loginAnonymousUser} from '../actions';
import {Form,Item,Label,Input,Button, Container, Header,Thumbnail, Content, Card, CardItem, Text, Body,Spinner } from 'native-base';
import { Image,View ,ImageBackground} from 'react-native';
import {Sae} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';


class LoginForm extends Component {


    onUserChange(text) {
        this.props.userChanged(text);

      }



  render() {
    const themeColor ='#238AC5';
    return (
        <ImageBackground style={styles.containerStyle} source={require('../../assets/back-white.png')}>
        <View style ={{flex : .3}}/>
        <Thumbnail square
        source={require('../../assets/icon.png')}
        style={{width:150 , height:150,alignSelf:'center'}} />
        {this.renderButton()}
       <View style ={{flex : .3}}/>
       </ImageBackground>

    );
  }

  renderButton()
  {
    if (this.props.loading)
    {
        return <Spinner size="large" color='#238AC5'/>;
    }
    return(
        <View  style={styles.containerStyle} >
            <View>
                           <Sae
                                    label ="اسم الستخدم"
                                    iconClass={Icon}
                                    iconName={'user-circle-o'}
                                    iconColor='#238AC5'
                                    labelStyle={{color : '#ddd'}}
                                    inputStyle={{color:'#fff'}}
                                    onChangeText={this.onUserChange.bind(this)}
                                    value={this.props.userName}/>

                            <Text style={styles.errorTextStyle}>
                                    {this.props.error}
                            </Text>

            <Button block
            style ={{backgroundColor :'#238AC5' , borderBottomLeftRadius: 30 , borderBottomRightRadius: 30 }}
            onPress ={()=> {
                            const { userName } = this.props;
                            this.props.loginUser({ userName });
                        }}>
                <Text>دخول</Text>
            </Button>
            </View>
            <View style = {{borderColor : '#ccc', borderWidth : 1}}/>
            <Button block
                style ={{backgroundColor :'white',borderColor:'#238AC5',borderWidth:1 ,borderRadius: 50}}
                onPress ={()=> {
                            this.props.loginAnonymousUser();
                        }}>
                <Text style={{color : '#238AC5'}}>دخول كمجهول</Text>
            </Button>
        </View >);
  }
}


const styles = {
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    },
    inputStyle : {
     fontSize:20,
     color :'red',
     alignSelf :'center'
    },
     containerStyle : {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems : 'stretch',
        padding : 20
      }

  };

const mapStateToProps = ({ auth }) => {

    const { userName, loading ,error} = auth;
    return { userName, loading , error};
  };

  export default connect(mapStateToProps, {
    userChanged, loginUser ,loginAnonymousUser
  })(LoginForm);



