import { SIGNUP,SIGNUP_SUCCESS } from '../actions/auth';
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
	Signup = (actions$ : ActionsObservable<any>) => {
		return actions$.ofType(SIGNUP)
		.switchMap(({payload})=>{
			console.log(payload);
			
			return Observable.of({type : SIGNUP_SUCCESS , payload : 'send data to reducer'})
		})
	}
}