import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LOGIN } from '../../actions/auth';
import { NgRedux } from 'ng2-redux';
import { AppState } from "../../reducers/rootReducer";

@Component({
	selector : 'login',
	templateUrl : 'login.html'
})
export class LoginPage { 
	loginForm : FormGroup;

	constructor(private ngRedux : NgRedux<AppState>,
				private navCtrl : NavController,
				private fb : FormBuilder){

	}
	ngOnInit(){
		// this.loginForm = this.fb.group({
		// 	email : '',
		// 	password : ''
		// })
	}

	login(){
		this.ngRedux.dispatch({
			type : LOGIN,
			payload : this.loginForm.value
		})
	 console.log(this.loginForm.value);
	 	
	}

	gotoSignup(){
		this.navCtrl.push(SignupPage)
		console.log('helo');	
	}
}