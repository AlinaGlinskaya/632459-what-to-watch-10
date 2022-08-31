import {AuthorizationStatus} from '../../const';
import {UserProcess} from '../../types/types';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {userProcess} from './user-process';
import {makeFakeUser} from '../../utils/mock';

const mockUser = makeFakeUser();

describe('Reducer: userProcess', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {authorizationStatus: AuthorizationStatus.Unknown, userData: null};
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown, userData: null});
  });


  describe('CheckAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type, payload: mockUser}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userData: mockUser});
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: null});
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: loginAction.fulfilled.type, payload: mockUser}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userData: mockUser});
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: null});
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: null});
    });
  });

});
