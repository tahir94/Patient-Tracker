import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { NgRedux } from 'ng2-redux';
import { AppState } from "../../reducers/rootReducer";
import { SIGNUP } from "../../actions/auth";


@Component({
	selector : 'signup',
	templateUrl : 'signup.html'
})

export class SignupPage { 
	signupForm : FormGroup;
	constructor(private fb : FormBuilder,
	            private ngRedux : NgRedux<AppState>){

	}
	ngOnInit(){
		// this.signupForm = this.fb.group({
		// 	name : '',
		// 	email : '',
		// 	password : ''
		// })
	}

	signup(){
		console.log(this.signupForm.value);
		this.ngRedux.dispatch({
		type : SIGNUP,
		payload : this.signupForm.value
		})
	}

}