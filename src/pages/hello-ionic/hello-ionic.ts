import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SIGNUP } from '../../actions/auth'
import { NgRedux } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import { FormGroup,FormBuilder,Validators } from "@angular/forms";

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnInit { 
  patientForm : FormGroup;
  isPatientForm = false;
  isAddPatient = true; 
  items: Observable<any[]>;
  genders = [
	  {value : 'male' , viewValue : 'Male'},
	  {value : 'female' , viewValue : 'Female'}
  ]
  constructor(private ngRedux : NgRedux<AppState>,
              private fb : FormBuilder) {
                this.patientForm = this.fb.group({
                  patientName : '',
                  patientAge : '',
                  patientAddress : '',
                  gender : '' 
                })
	// this.items = db.collection('items').valueChanges();
  }
  ngOnInit(){
  
  }

  

  addPatient(){
	this.isAddPatient = false;
	this.isPatientForm = true;

	this.ngRedux.dispatch({
		type : SIGNUP,
		payload : this.patientForm.value
	})  
	  
  }
}
