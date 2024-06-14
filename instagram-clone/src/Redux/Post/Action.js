import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, REQ_USER_POST, SAVE_POST, UNLIKE_POST, UNSAVE_POST } from "./ActionType";

export const createPostHandler = (data) => async(dispatch) => {
    try{
        const res = await fetch(`http://localhost:5665/api/posts/create`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer "+data.jwt 
            },
            body: JSON.stringify(data.data),
        });

        const post = await res.json() ;
        console.log("created new post: ", post) ;
        dispatch({type:CREATE_NEW_POST, payload:post});
    }
    catch(error){
        console.log("error while creating post: ",error) ;
    }
}

export const findUserPostHandler = (data) => async(dispatch) => {
    const res = await fetch(`http://localhost:5665/api/posts/following/${data.userIds}`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt 
        },
    });

    const post = await res.json() ;

    console.log("find post by user ids: " , post) ;

    dispatch({type:GET_USER_POST, payload:post});
}

export const reqUserPostHandler = (data) => async(dispatch) => {
    const res = await fetch(`http://localhost:5665/api/posts/all/${data.userId}`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt 
        },
    });

    const posts = await res.json() ;

    console.log("find post by user id: " , posts) ;

    dispatch({type:REQ_USER_POST, payload:posts});
}

export const likePostHandler = (data) => async(dispatch) => {
    const res = await fetch(`http://localhost:5665/api/posts/like/${data.postId}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt 
        },
    });

    const post = await res.json() ;

    console.log("find post by user ids: " , post) ;

    dispatch({type:LIKE_POST, payload:post});
}

export const unlikePostHandler = (data) => async(dispatch) => {
    const res = await fetch(`http://localhost:5665/api/posts/unlike/${data.postId}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt 
        },
    });

    const post = await res.json() ;

    console.log("find post by user ids: " , post) ;

    dispatch({type:UNLIKE_POST, payload:post});
}

export const savePostHandler = (data) => async(dispatch) => {
    const res = await fetch(`http://localhost:5665/api/posts/save_post/${data.postId}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt 
        },
    });

    const post = await res.json() ;

    console.log("saved post " , post) ;

    dispatch({type:SAVE_POST, payload:post});
}

export const unsavePostHandler = (data) => async(dispatch) => {
    const res = await fetch(`http://localhost:5665/api/posts/unsave_post/${data.postId}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt 
        },
    });

    const post = await res.json() ;

    console.log("unsaved post " , post) ;

    dispatch({type:UNSAVE_POST, payload:post});
}

export const findPostByIdHandler = (data) => async(dispatch) => {
    const res = await fetch(`http://localhost:5665/api/posts/${data.postId}`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt 
        },
    });

    const post = await res.json() ;

    console.log("get single post: " , post) ;

    dispatch({type:GET_SINGLE_POST, payload:post});
}

export const deletePostByIdHandler = (data) => async(dispatch) => {
    const res = await fetch(`http://localhost:5665/api/posts/delete/${data.postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt 
        },
    });

    const post = await res.json() ;

    console.log("deleted post: " , post) ;

    dispatch({type:DELETE_POST, payload:post});
}