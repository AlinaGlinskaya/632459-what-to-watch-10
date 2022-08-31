import {CommentProcess} from '../../types/types';
import {makeFakeComment} from '../../utils/mock';
import {addCommentAction, fetchCommentsAction} from '../api-actions';
import {commentProcess} from './comment-process';

const mockComments = Array.from({length: 5}, makeFakeComment);

describe('Reducer: commentProcess', () => {
  let state: CommentProcess;

  beforeEach(() => {
    state = {comments: [], isPosting: false};
  });

  it('without additional parameters should return initial state', () => {
    expect(commentProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({comments: [], isPosting: false});
  });

  describe('fetchCommentsAction test', () => {
    it('should update comments by load comments', () => {
      expect(commentProcess.reducer(state, {type: fetchCommentsAction.fulfilled.type, payload: mockComments}))
        .toEqual({comments: mockComments, isPosting: false});
    });
  });

  describe('addCommentAction test', () => {

    it('should set "isPosting": true if comment is sending', () => {
      expect(commentProcess.reducer(state, {type: addCommentAction.pending.type}))
        .toEqual({comments: [], isPosting: true});
    });

    it('should set "isPosting": false if comment posting is failed', () => {
      expect(commentProcess.reducer(state, {type: addCommentAction.rejected.type}))
        .toEqual({comments: [], isPosting: false});
    });

    it('should set "isPosting": false if comment posted', () => {
      expect(commentProcess.reducer(state, {type: addCommentAction.fulfilled.type}))
        .toEqual({comments: [], isPosting: false});
    });
  });
});
