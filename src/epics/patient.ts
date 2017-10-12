import { DELETE, SIGNUP, SIGNUP_SUCCESS, SET_DATA_LOCALLLY, LOCAL_DATA_SUCCESS } from '../actions/patient';
import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
// import { NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../pages/patient-list/patient-list';
import { Storage } from '@ionic/storage';
import { NgRedux } from "ng2-redux";
import { Observable } from 'rxjs/Observable';
import { AppState } from '../reducers/rootReducer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';


@Injectable()

export class AuthEpic {
	patientDataArray = [];
	sendDataToLocal = [];
	newData;

	constructor(private storage: Storage, private ngRedux: NgRedux<AppState>) {

	}
	Signup = (actions$: ActionsObservable<any>) => {
		this.patientDataArray = [];
		return actions$.ofType(SIGNUP)
			.switchMap(({ payload, navCtrl }) => {
				console.log('EPIC LOG', payload);
				this.patientDataArray.push(payload);
				navCtrl();
				// navCtrl.push(ListPage);
				return Observable.of({ type: SIGNUP_SUCCESS, payload: this.patientDataArray })
			})
	}
	deleteInd = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(DELETE)
			.switchMap(({ payload, navCtrl }) => {
				console.log(payload);
				this.storage.get('patientData').then((data) => {
					console.log(data);
					this.newData = [...data];
					this.newData.splice(payload, 1)
					this.storage.set('patientData', this.newData)
					this.ngRedux.dispatch({
						type: LOCAL_DATA_SUCCESS,
						payload: this.newData
					})
					navCtrl()
					console.log(this.newData);
				})
				return Observable.of()
			})
	}
	saveDataLocally = (actions$: ActionsObservable<any>) => {

		return actions$.ofType(SET_DATA_LOCALLLY)
			.switchMap(({ payload }) => {
				console.log(payload);
				this.storage.get('patientData').then((data) => {
					console.log(data);
					if (data) {
						console.warn('if', payload);
						console.log("DATA", data);
						this.newData = [...data];
						this.newData.push(payload[payload.length - 1]);
						console.log('AJSDLKJSALDK', this.newData)
						this.storage.set('patientData', this.newData)

						this.ngRedux.dispatch({
							type: LOCAL_DATA_SUCCESS,
							payload: this.newData
						})
					}
					else {
						console.warn('ELSE');
						this.storage.set('patientData', payload);
						this.ngRedux.dispatch({
							type: LOCAL_DATA_SUCCESS,
							payload: this.newData
						})
					}
					console.log(this.newData);
				})
				return Observable.of()
			})
	}
}