import {NameSpace} from '../../const';
import {State} from '../../types/types';
import {AuthorizationStatus} from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
