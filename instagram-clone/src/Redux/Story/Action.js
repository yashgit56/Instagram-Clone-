import { FETCH_FOLLOWING_USER_STORY, FETCH_USER_STORY } from "./ActionType";


export const findFollowingUserStory = (data) => async (dispatch) => {
    const res = await fetch(`http://localhost:5665/api/stories/create`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+data.jwt 
        },
    });

    const stories = await res.json() ;
    dispatch({type:FETCH_FOLLOWING_USER_STORY, payload: stories});
}

export const findStoryByUserId = (data) => async (dispatch) => {
    try{
        const res = await fetch(`http://localhost:5665/api/stories/${data.userId}`,{
            method: "GET",
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer "+data.jwt 
            },
        });

        const stories = await res.json() ;
        dispatch({type:FETCH_USER_STORY, payload: stories});
    }
    catch(error){
        console.log("error: ",error) ;
    }
}