import {createAction} from '@reduxjs/toolkit';

export const changeFilter = createAction('main/changeFilter');
export const getFilms = createAction('main/getFilms');
export const resetFilters = createAction('main/resetFilters');
