import {createAction, props} from '@ngrx/store';
import {User} from '../models/user';

export enum AuthenticateActionType {
  Authenticate = '[Auth] Authenticate user',
  AuthenticateSuccess = '[Auth] Authenticate user success',
  AuthenticateFailure = '[Auth] Authenticate user failure'
}

export const authenticateAction = createAction(AuthenticateActionType.Authenticate);
export const authenticateSuccessAction = createAction(AuthenticateActionType.AuthenticateSuccess, props<{ authUser: User }>());
export const authenticationFailureAction = createAction(AuthenticateActionType.AuthenticateFailure, props<{ failureMessage: string }>());

export const AuthenticateActions = {
  authenticateAction,
  authenticateSuccessAction,
  authenticationFailureAction
};

