import { CREATE_COMMENT, GET_POST_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT } from "./ActionType";


export const createCommentHandler = (data) => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:5665/api/comments/create/${data.postId}`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer " + data.jwt 
            },
            body: JSON.stringify(data.data) 
        });

        const comment = await res.json() ;
        console.log("Created Comment: ", comment) ;
        dispatch({type: CREATE_COMMENT, payload: comment}) ;
    } catch (error) {
        console.log("while create comment: ", error) ;
    }
}

export const findPostCommentHandler = (data) => async (dispatch) => {
    try {

        const res = await fetch(`http://localhost:5665/api/comments/${data.postId}`,{
            method: "GET",
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer " + data.jwt 
            }
        });

        const comment = await res.json() ;
        console.log("find post comment: ", comment) ;
        dispatch({type: GET_POST_COMMENT, payload: comment}) ;

    } catch (error) {
        console.log("while getting post comment: ", error) ;
    }
}

export const likeCommentHandler = (data) => async (dispatch) => {
    try {

        const res = await fetch(`http://localhost:5665/api/comments/like/${data.commentId}`,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer " + data.jwt 
            }
        });

        const comment = await res.json() ;
        console.log("like comment: ", comment) ;
        dispatch({type: LIKE_COMMENT, payload: comment}) ;

    } catch (error) {
        console.log("while like comment: ", error) ;
    }
}

export const unlikeCommentHandler = (data) => async (dispatch) => {
    try {

        const res = await fetch(`http://localhost:5665/api/comments/unlike/${data.commentId}`,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer " + data.jwt 
            }
        });

        const comment = await res.json() ;
        console.log("unlike comment: ", comment) ;
        dispatch({type: UNLIKE_COMMENT, payload: comment}) ;

    } catch (error) {
        console.log("while unlike comment: ", error) ;
    }
}

