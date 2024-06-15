import { CREATE_STORY, FETCH_FOLLOWING_USER_STORY, FETCH_USER_STORY } from "./ActionType"

const initialValue = {
    stories: null ,
    createdStory: null 
}

export const StoryReducer = ( store=initialValue , {type,payload}) => {
    if(type === FETCH_USER_STORY){
        return { ...store, stories:payload} ;
    }
    else if(type === CREATE_STORY){
        return { ...store, createdStory: payload} ;
    }
    else if(type === FETCH_FOLLOWING_USER_STORY){
        return { ...store, stories: payload} ;
    }

    return store ;
}

