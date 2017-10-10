import { tassign } from 'tassign';
import { SIGNUP_SUCCESS } from '../actions/auth';


export interface AuthState {
 patientData : Array<any>;

}

export const AUTH_INITIAL_STATE = {
 patientData : null
}

export const AuthReducer = (state: AuthState = AUTH_INITIAL_STATE, action) => {
 
	switch(action.type){

	case SIGNUP_SUCCESS:

	console.log('reducer log : ', action.payload );
	return tassign(state,{patientData : action.payload})
   
	  default : 
	return state;
	 
}

}