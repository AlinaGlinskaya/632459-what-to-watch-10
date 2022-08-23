import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CommentProcess} from '../../types/types';
import {fetchCommentsAction, addCommentAction} from '../api-actions';

const initialState: CommentProcess = {
  comments: [],
  isPosting: false
};

export const commentProcess = createSlice({
  name: NameSpace.Comment,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(addCommentAction.pending, (state) => {
        state.isPosting = true;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.isPosting = false;
      })
      .addCase(addCommentAction.fulfilled, (state) => {
        state.isPosting = false;
      });
  }
});
