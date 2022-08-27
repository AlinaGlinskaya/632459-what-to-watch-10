import {State, FavoriteProcess} from '../../types/types';
import {NameSpace} from '../../const';

export const getFavoriteFilms = (state: State): FavoriteProcess['favoriteFilms'] => state[NameSpace.Favorite].favoriteFilms;

