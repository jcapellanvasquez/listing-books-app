import {createAction, props} from '@ngrx/store';
import {Permission} from '../models/permission';

export enum PermissionActionTypes {
  LoadPermission = '[Permission] Load Permission',
  LoadPermissionSuccess = '[Permission] Load Permission Success',
  LoadPermissionFailure = '[Permission] Load Permission Failure',
}

export const loadPermission = createAction(PermissionActionTypes.LoadPermission, props<{ permission: Permission}>());
export const loadPermissionSuccessAction = createAction(PermissionActionTypes.LoadPermissionSuccess, props<{ canSave: boolean}>());
export const loadPermissionFailureAction = createAction(PermissionActionTypes.LoadPermissionFailure, props<{ failureMessage: string }>());

export const PermissionActions = {
  loadPermission,
  loadPermissionSuccessAction,
  loadPermissionFailureAction
};
