import { tassign } from 'tassign';
import { DELETE, ADD_PATIENT,ADD_PATIENT_SUCCESS,LOCAL_DATA_SUCCESS } from '../actions/patient';


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

	case ADD_PATIENT_SUCCESS:

	return tassign(state,{patientData : action.payload})

	case LOCAL_DATA_SUCCESS:
		
	return tassign(state, {patientLocalData: action.payload})

	default : 
	return state;
	 
}

}