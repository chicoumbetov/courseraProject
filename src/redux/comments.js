//no need since it's fetched from server
//import { COMMENTS } from "../shared/comments";
import * as ActionTypes from './ActionTypes';

//comments reducer
export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, isLoading: false, errMess: null, comments: action.payload }

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, comments: [] }

        case ActionTypes.ADD_COMMENT:
            //this will take care adding comment into redux store
            var comment = action.payload;
            //comment.id = state.comments.length;   //no need since server automatically create it
            return { ...state, comments: state.comments.concat(comment) };
        default:
            return state;
    }
}