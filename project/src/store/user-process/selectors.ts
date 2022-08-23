import {NameSpace} from '../../const';
import {State, UserData} from '../../types/types';
import {AuthorizationStatus} from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getuserData = (state: State): UserData | null => state[NameSpace.User].userData;
