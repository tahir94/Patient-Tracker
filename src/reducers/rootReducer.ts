import { combineReducers } from 'redux';
import { PatientState,PATIENT_INITIAL_STATE,PatientReducer } from './patient';


export interface AppState {
	auth : PatientState

}

export const INITIAL_STATE = {
	auth : PATIENT_INITIAL_STATE
}

export const RootReducer = combineReducers<AppState>({
	auth : PatientReducer

})