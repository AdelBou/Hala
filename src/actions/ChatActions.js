import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
    SET_USER, SEARCH_FRIEND, SET_MESSAGES, SET_FRIEND, SET_CHATREF,SEND_MESSAGE,STOP_CHATT
} from './types';




export const set_user = (username = 'مجهول') => {
    let user = firebase.auth().currentUser;
    let theUserToPush = {
        id: user.uid,
        connected: false,
        searchingForFriend: false,
        name: username,
        chattingWith: '',
    };
    firebase.database().ref(`/users/${theUserToPush.id}`).set(
        theUserToPush);

    return {
        type: SET_USER,
        payload: theUserToPush
    };
};

getMessages=(user, friend) =>{
        return listenForItems(firebase.database().ref().child('chat/' + generateChatId()).orderByChild('order'), user, friend);
}

export const set_messages = (user, friend) => {
    return{
    type:SET_MESSAGES,
        payload:getMessages(user,friend),
    }
};

export const get_chatref = (user, friend) => {
   // let ref = firebase.database().ref().child('chat/' + generateChatId(user, friend));
    return generateChatId(user, friend);
};


export const search_friend = (user) => {
    return (dispatch) => {
        dispatch({
            type: SEARCH_FRIEND,
            payload: true,
        });
        set_searchingForFriend(user, true);
        let friend = {
            id: "",
            connected: false,
            searchingForFriend: false,
            name: "none",
            chattingWith: null,
        };

        let listenToOther = firebase.database().ref(`/users/${user.id}`);
        let searchForOther = firebase.database().ref(`/users`).orderByChild("searchingForFriend").equalTo(true);

        listenToOther.on('value', snapshot => {
            if (snapshot.val().chattingWith !== '') {
                firebase.database().ref(`/users/${snapshot.val().id}`).once(
                    'value', snapshot => {
                        friend = snapshot.val();
                    }
                );
                // set_friend(dispatch, user, friend);
                // set_searchingForFriend(user, false);
                //  set_searchingForFriend(friend, false);
                listenToOther.off();
                searchForOther.off();
                stayConnected (dispatch,user,friend);
                dispatch({
                    type: SET_FRIEND,
                    payload: friend,
                });

                return;
            }
        });

        searchForOther
            .on(
                'value', snapshot => {


                    snapshot.forEach(function (childSnapshot) {
                        if (childSnapshot.val().id !== user.id) {
                            friend = childSnapshot.val();

                        }
                    });

                    if (friend.name === 'none') {
                        console.log("did not find someone to fuck" + friend.name);

                    }
                    else {
                        console.log("found someone to fuck" + friend.name);
                        listenToOther.off();
                        searchForOther.off();
                        set_friend(dispatch, user, friend);
                        set_searchingForFriend(user, false);
                        set_searchingForFriend(friend, false);
                        stayConnected (dispatch,user,friend);

                        firebase.database().ref('/chat/'+generateChatId(user,friend)).remove();

                        dispatch({
                            type: SET_FRIEND,
                            payload: friend,
                        });
                        return;
                    }

                }
            );


    };

};









set_searchingForFriend = (user, x) => {
    firebase.database().ref(`/users/${user.id}`).child('searchingForFriend').set(x);
};


set_friend = (dispatch, user, friend) => {
    firebase.database().ref(`/users/${user.id}`).child('chattingWith').set(friend.id);
    firebase.database().ref(`/users/${friend.id}`).child('chattingWith').set(user.id);
}


startTimer = (duration) => {

}

    generateChatId=(user,friend)=> {
        if(user.id > friend.id)
            return `${user.id}-${friend.id}`;
        else
            return `${friend.id}-${user.id}`
    }




stayConnected =(dispatch,user,friend)=>{
        let x=friend.chattingWith;
        let listenToOther = firebase.database().ref(`/users/${friend.id}`);
        listenToOther.on('value', (snap) => {
            if (snap.val().chattingWith===''){
                console.log("the other disconnected"+friend.name);
                set_user(user.name);
                dispatch({
                    type:STOP_CHATT,
                    payload:false
                });

                listenToOther.off();
            }
            }
        )

};


