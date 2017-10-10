import { tassign } from 'tassign';
import { SIGNUP_SUCCESS } from '../actions/auth';


export interface AuthState {
 demo : string;

}

export const AUTH_INITIAL_STATE = {
 demo : null
}

export const AuthReducer = (state: AuthState = AUTH_INITIAL_STATE, action) => {
 
	switch(action.type){

	case SIGNUP_SUCCESS:

	console.log('reducer log : ', action.payload );
	return tassign(state,{demo : action.payload})
   
	  default : 
	return state;
	 
}

}