import { FOLLOW_USER, GET_USER_BY_USERNAME, GET_USERS_BY_USER_IDS, REQ_USER, SEARCH_USER, SUGGESTION_USER, UNFOLLOW_USER, UPDATE_USER } from "./ActionType";

export const getUserProfileAction = (jwt) => async (dispatch) => {

    try{
        const res = await fetch("http://localhost:5665/api/users/req",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        });

        // console.log("response: ",res) ;

        const reqUser = await res.json() ;

        // console.log("user: ",reqUser) ;

        dispatch({type:REQ_USER, payload: reqUser});
    }
    catch(error){
        console.log("catch: ", error) ;
    }
}

export const findUserByUsernameAction = (data) => async(dispatch) => {
    try{
        const response = await fetch(`http://localhost:5665/api/users/username/${data.username}`, {
            method: "GET",
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer "+ data.jwt 
            }
        });

        const user = await response.json() ;

        console.log("find by username: ",user) ;
        dispatch({type:GET_USER_BY_USERNAME, payload:user});
    }
    catch(error){
        console.log("Error: ",error) ;
    }
}

export const findUserByUserIdsAction = (data) => async(dispatch) => {
    const res = await fetch(`http://localhost:5665/api/users/m/${data.userIds}`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt  
        }
    });

    const users = await res.json() ;

    console.log("find by user ids : ",users) ;
    dispatch({type:GET_USERS_BY_USER_IDS, payload:users});
}

export const followUserAction = (data) => async(dispatch) => {
    const res = await fetch(`http://localhost:5665/api/users/follow/${data.userId}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt  
        }
    });

    const user = await res.json() ;

    console.log("follow user: ",user) ;
    dispatch({type:FOLLOW_USER, payload:user});
}

export const unfollowUserAction = (data) => async(dispatch) => {
    const res = await fetch(`http://localhost:5665/api/users/unfollow/${data.userId}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt  
        }
    });

    const user = await res.json() ;

    console.log("unfollow user: ",user) ;
    dispatch({type:UNFOLLOW_USER, payload:user});
}

export const searchUserAction = (data) => async(dispatch) => {
    const res = await fetch(`http://localhost:5665/api/users/search?q=${data.query}`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt  
        }
    });

    const user = await res.json() ;

    console.log("search user: ",user) ;
    dispatch({type:SEARCH_USER, payload:user});
}

export const editUserAction = (data) => async(dispatch) => {
    try{
        const res = await fetch(`http://localhost:5665/api/users/accounts/edit`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer "+data.jwt  
            },
            body: JSON.stringify(data.data)
        });

        const user = await res.json() ;

        console.log("edit user: ",user) ;

        dispatch({type:UPDATE_USER, payload:user});
    }
    catch(error){
        console.log("catch error ", error) ;
    }
}

export const getSuggestionUsersAction = (jwt) => async(dispatch) => {
    try{
        const res = await fetch(`http://localhost:5665/api/users/suggestions`, {
            method: "GET",
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer "+ jwt  
            }
        });

        const users = await res.json() ;

        console.log("suggested users: ",users) ;

        dispatch({type:SUGGESTION_USER, payload:users});
    }
    catch(error){
        console.log("catch error ", error) ;
    }
}