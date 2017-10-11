import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SIGNUP } from '../../actions/auth'
import { NgRedux } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, NavParams, Nav } from 'ionic-angular';
import { ListPage } from "../list/list";

@Component({
	selector: 'page-hello-ionic',
	templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnInit {
	// @ViewChild('content') nav: NavController;
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
		// this.items = db.collection('items').valueChanges();
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
		// this.navCtrl.push(ListPage);
	}
}
