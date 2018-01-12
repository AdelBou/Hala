import FontAwesome, {Icons} from 'react-native-fontawesome';
import React, {Component} from 'react';
import {
    Text
} from 'react-native';

export default class MyIcon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            icon: Icons.menu
        };

    }

    componentDidMount() {
        this.setState({
            icon: (this.props.type === 'menu') ? Icons.bars : (this.props.type === 'change') ? Icons.users : (this.props.type === 'emoji')?Icons.smileO:(this.props.type === 'emoji')?Icons.paperPlaneO:Icons.signOut,
        });
    }

    getTheicon() {


        return (
            <Text style={[{ fontSize: 18, color: '#FFF'},this.props.style]}>
                <FontAwesome>{this.state.icon}</FontAwesome>
            </Text>

        );

    }


    render() {
        return this.getTheicon();

    }
}