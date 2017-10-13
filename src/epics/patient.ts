import { DELETE, ADD_PATIENT, ADD_PATIENT_SUCCESS, SET_DATA_LOCALLLY, LOCAL_DATA_SUCCESS } from '../actions/patient';
import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Storage } from '@ionic/storage';
import { NgRedux } from "ng2-redux";
import { AppState } from '../reducers/rootReducer';

// rxjs imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';


@Injectable()

export class PatientEpic {
	patientDataArray = [];
	sendDataToLocal = [];
	newData;

	constructor(private storage: Storage, private ngRedux: NgRedux<AppState>) {

	}
	Patient = (actions$: ActionsObservable<any>) => {
		this.patientDataArray = [];
		return actions$.ofType(ADD_PATIENT)
			.switchMap(({ payload, navCtrl }) => {
				this.patientDataArray.push(payload);
				navCtrl();
				return Observable.of({ type: ADD_PATIENT_SUCCESS, payload: this.patientDataArray })
			})
	}
	deleteInd = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(DELETE)
			.switchMap(({ payload, navCtrl }) => {
				this.storage.get('patientData').then((data) => {
					this.newData = [...data];
					this.newData.splice(payload, 1)
					this.storage.set('patientData', this.newData)
					this.ngRedux.dispatch({
						type: LOCAL_DATA_SUCCESS,
						payload: this.newData
					})
					navCtrl()
				})
				return Observable.of()
			})
	}
	saveDataLocally = (actions$: ActionsObservable<any>) => {

		return actions$.ofType(SET_DATA_LOCALLLY)
			.switchMap(({ payload }) => {
				this.storage.get('patientData').then((data) => {
					if (data) {
						this.newData = [...data];
						this.newData.push(payload[payload.length - 1]);
						this.storage.set('patientData', this.newData)

						this.ngRedux.dispatch({
							type: LOCAL_DATA_SUCCESS,
							payload: this.newData
						})
					}
					else {
						this.storage.set('patientData', payload)
							.then(abc => {

								this.storage.get('patientData').then(dd => {

									this.ngRedux.dispatch({
										type: LOCAL_DATA_SUCCESS,
										payload: dd
									})
								})
							})
						// this.newData = [...data];
					}
				})
				return Observable.of()
			})
	}
}