import { createAction, props } from "@ngrx/store";
import { MyRequestsModel, PatientModel } from "src/app/shared/model/patient.model";

export const UPDATE_CURRENT_PATIENT = '[register patient] update current patient';
export const updateCurrentPatient = createAction(UPDATE_CURRENT_PATIENT,props<PatientModel>());

export const ADD_MY_REQUEST = '[patient] add my request';
export const addMyRequest = createAction(ADD_MY_REQUEST, props<{requests: MyRequestsModel[]}>());

export const POPULATE_MY_REQUEST = '[patient] populate my request';
export const populateMyRequest = createAction(POPULATE_MY_REQUEST,props<{requests: MyRequestsModel[]}>());

export const UPDATE_MY_REQUEST = '[patient] update my request';
export const updateMyRequest = createAction(UPDATE_MY_REQUEST, props<{requests: MyRequestsModel[]}>());

export const REGISTER_START = '[register patient] start register';
export const registerStart = createAction(REGISTER_START,props<PatientModel>());

export const ADD_REQUEST_START = '[patient] start add my request';
export const startAddMyRequest = createAction(ADD_REQUEST_START, props<MyRequestsModel>());

export const LOGIN_USER = '[patient] login';
export const login = createAction(LOGIN_USER,props<{email:string, password:string}>());

export const LOGOUT_USER = '[patient] logout';
export const logout = createAction(LOGOUT_USER);

export const CHANGE_STATUS = '[request] change status';
export const changeStatus = createAction(CHANGE_STATUS, props<MyRequestsModel>());

export const POPULATE_USERS = '[users] populate users';
export const populateUsers = createAction(POPULATE_USERS);

export const LOAD_USERS = '[users] load users';
export const loadUsers = createAction(LOAD_USERS,props<{users: PatientModel[]}>());

export const UPDATE_STATUS = '[users] update status';
export const updateStatus = createAction(UPDATE_STATUS,props<PatientModel>());

export const UPDATE_USER = '[user] update user';
export const updateUser = createAction(UPDATE_USER,props<PatientModel>());