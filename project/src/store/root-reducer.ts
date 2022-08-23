import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import {filterProcess} from './filter-process/filter-process';
import {commentProcess} from './comment-process/comment-process';
import {filmProcess} from './film-process/film-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Filter]: filterProcess.reducer,
  [NameSpace.Comment]: commentProcess.reducer,
  [NameSpace.Film]: filmProcess.reducer,
});
