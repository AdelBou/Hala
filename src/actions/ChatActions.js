import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
    SET_USER, SEARCH_FRIEND, SET_MESSAGES, SET_FRIEND
} from './types';


export const set_user = (username = 'مجهول') => {
    let user = firebase.auth().currentUser;
    let theUserToPush = {
        id: user.uid,
        connected: false,
        searchingForFriend: false,
        name: username,
        chattingWith: null,
    };
    firebase.database().ref(`/users/${theUserToPush.id}`).set(
        theUserToPush);

    return {
        type: SET_USER,
        payload: theUserToPush
    };
};

export const set_messages = (user) => {
    messages = [
        {
            _id: 1,
            text: 'يا هلا بالحبايب',
            createdAt: new Date(),
            user: user
            ,
        },
    ];
    return {
        type: SET_MESSAGES,
        payload: messages
    };
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
        firebase.database().ref(`/users/${user.id}`)
            .on( 'value', snapshot => {
                if (snapshot.val().chattingWith!==null){
                    firebase.database().ref(`/users/${snapshot.val()}`).once(
                        'value', snapshot => {
                            friend=snapshot.val();
                        }
                    );
                        set_friend(dispatch, user, friend);
                        set_searchingForFriend(user, false);
                        set_searchingForFriend(friend, false);
                        dispatch({
                            type: SET_FRIEND,
                            payload: friend,
                        });
                }
            });

        firebase.database().ref(`/users`).orderByChild("searchingForFriend").equalTo(true)
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
                        set_friend(dispatch, user, friend);
                        set_searchingForFriend(user, false);
                        set_searchingForFriend(friend, false);
                        dispatch({
                            type: SET_FRIEND,
                            payload: friend,
                        });
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
