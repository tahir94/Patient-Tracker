import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SIGNUP } from '../../actions/patient'
import { NgRedux } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, NavParams, Nav } from 'ionic-angular';
import { ListPage } from "../patient-list/patient-list";

@Component({
	selector: 'page-patient',
	templateUrl: 'patient.html'
})
export class patientPage implements OnInit {

	patientForm: FormGroup;
	isPatientForm = false;
	isAddPatient = true;
	items: Observable<any[]>;
	
	genders = [
		{ value: 'male', viewValue: 'Male' },
		{ value: 'female', viewValue: 'Female' }
	]
	constructor(private ngRedux: NgRedux<AppState>,
		        private fb: FormBuilder, public navCtrl: NavController) {
		this.patientForm = this.fb.group({
			patientName: '',
			patientAge: '',
			patientAddress: '',
			gender: ''
		})
	
	}
	ngOnInit() {

	}

	add() {
		this.isAddPatient = false;
		this.isPatientForm = true;
	}

	addPatient() {
		this.isAddPatient = false;
		this.isPatientForm = true;

		this.ngRedux.dispatch({
			type: SIGNUP,
			payload: this.patientForm.value,
			navCtrl: () => this.navCtrl.push(ListPage)
		})
	}
}
