import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { AuthReducer } from "../Redux/Auth/Reducer";
import { UserReducer } from "../Redux/User/UserReducer";
import { thunk } from "redux-thunk";
import { PostReducer } from "../Redux/Post/PostReducer";
import { CommentReducer } from "../Redux/Comment/CommentReducer";
import { StoryReducer } from "../Redux/Story/StoryReducer";


const rootReducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    post: PostReducer,
    comment: CommentReducer,
    story: StoryReducer
});

export const store = legacy_createStore(rootReducers,  applyMiddleware(thunk)) ;

