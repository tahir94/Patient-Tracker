import { SIGNUP,SIGNUP_SUCCESS,SET_DATA_LOCALLLY } from '../actions/auth';
import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';


@Injectable()

export class AuthEpic { 
	patientDataArray = [];

	Signup = (actions$ : ActionsObservable<any>) => {
		this.patientDataArray = [];
		return actions$.ofType(SIGNUP)
		.switchMap(({payload})=>{
			console.log('EPIC LOG',payload);
			this.patientDataArray.push(payload)
			return Observable.of({type : SIGNUP_SUCCESS , payload : this.patientDataArray})
		})
	}

	saveDataLocally = (actions$ : ActionsObservable<any>)=>{
		return actions$.ofType(SET_DATA_LOCALLLY)
		.switchMap((payload)=>{
			for(let i = 0; i < payload.length; i++){
				for (let name in payload[i]) {
					console.log("Item name: "+name);
					console.log("Source: "+payload[i][name]);
					console.log("Target: "+payload[i][name]);
				}
				
			}
			console.log('local log',payload);
			
			return Observable.of()
		})
	}
}