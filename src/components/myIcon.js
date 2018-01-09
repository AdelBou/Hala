import FontAwesome, { Icons } from 'react-native-fontawesome';
 import React, {Component} from 'react';
 import {
    Text
} from 'react-native';

export default class MyIcon extends Component{

    constructor(props){
        super(props);
         this.state = {
                    icon: Icons.menu
                };

    }
    componentDidMount(){
             this.setState({
                     icon: (this.props.type==='menu')? Icons.bars:(this.props.type==='change')?Icons.users:Icons.signOut,
                });
    }
    getTheicon(){


         return (
                    <Text style={{margin: 10, fontSize: 18,textAlign: 'left',color:'#FFF'}}>
                        <FontAwesome>{this.state.icon}</FontAwesome>
                    </Text>

        );

    }


    render() {
        return this.getTheicon();

    }
}