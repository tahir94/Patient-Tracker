import { tassign } from 'tassign';
import { DELETE, SIGNUP,SIGNUP_SUCCESS,LOCAL_DATA_SUCCESS } from '../actions/patient';


export interface PatientState {
 patientData : Array<any>;
 patientLocalData : Array<any>;
}

export const PATIENT_INITIAL_STATE = {
 patientData : null,
 patientLocalData : null
}

export const PatientReducer = (state: PatientState = PATIENT_INITIAL_STATE, action) => {
 
	switch(action.type){

	case SIGNUP_SUCCESS:

	console.log('reducer log : ', action.payload );
	return tassign(state,{patientData : action.payload})

	case LOCAL_DATA_SUCCESS:
	console.log(action.payload);

	return tassign(state, {patientLocalData: action.payload})

	default : 
	return state;
	 
}

}