import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
    SET_USER, SEARCH_FRIEND, SET_MESSAGES,SET_FRIEND
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
    set_searchingForFriend(user,true);
    let friend = {
        id: "",
        connected: false,
        searchingForFriend: false,
        name: "none",
        chattingWith: null,
    };

    let timer = duration, minutes, seconds;
    let timerId = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            console.log("minu:" + minutes + "seconds" + seconds);

            if (--timer < 0) {
            
                clearInterval(timerId);
                console.log("finished");
            }

        }
            .bind(this), 1000
    );




    firebase.database().ref(`/users`).orderByChild("searchingForFriend").equalTo(true)
        .once(
            'value', snapshot => {
                snapshot.forEach(function (childSnapshot) {
                    if (childSnapshot.val().id !== user.id) {
                        friend = childSnapshot.val();
                    }
                });

                if (friend.name === 'none') {
                    alert("did not find someone to fuck" + friend.name);

                }
                else {
                         alert("found someone to fuck" + friend.name);
                         set_friend(user,friend);
                         set_searchingForFriend(user,false);
                         set_searchingForFriend(friend,false);


                }

            }
        );
    // startTime(30, () => {
    return (dispatch) => {
        dispatch({
            type: SEARCH_FRIEND,
            plyload: friend,
        });
    };

};


set_searchingForFriend = (user,x) => {
     firebase.database().ref(`/users/${user.id}`).child('searchingForFriend').set(x);
};


set_friend =(user,friend)=>{
        firebase.database().ref(`/users/${user.id}`).child('chattingWith').set(friend.id);
        firebase.database().ref(`/users/${friend.id}`).child('chattingWith').set(user.id);
}


startTimer = (duration) => {

}
