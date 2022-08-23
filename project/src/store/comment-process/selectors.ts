import {NameSpace} from '../../const';
import {State, CommentProcess} from '../../types/types';

export const getIsPosting = (state: State): CommentProcess['isPosting'] => state[NameSpace.Comment].isPosting;
export const getComments = (state: State): CommentProcess['comments'] => state[NameSpace.Comment].comments;
