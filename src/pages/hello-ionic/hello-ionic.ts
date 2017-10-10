import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SIGNUP } from '../../actions/auth'
import { NgRedux } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import { FormGroup,FormBuilder,Validators } from "@angular/forms";

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage { 
  patientForm : FormGroup;
  isPatientForm = false;
  isAddPatient = true; 
  items: Observable<any[]>;
  genders = [
	  {value : 'male' , viewValue : 'Male'},
	  {value : 'female' , viewValue : 'Female'}
  ]
  constructor(private ngRedux : NgRedux<AppState>) {
	// this.items = db.collection('items').valueChanges();
  }

  

  addPatient(){
	this.isAddPatient = false;
	this.isPatientForm = true;

	this.ngRedux.dispatch({
		type : SIGNUP,
		payload : 'send data to epics'
	})  
	  
  }
}
