import React from 'react'
import {ScrollView, View, Text, TouchableOpacity} from 'react-native'
import EmojiSelector from 'react-native-emoji-selector';

export default class Emoji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: true}
    }



    render() {
        return (

                <EmojiSelector
                    onEmojiSelected={emoji => this.props.OnPressEmoji(emoji)}
                    showSearchBar={false}
               //     showTabs={false}
                    showHistory={false}
                   // colSize={}
                />

        )
    }
}