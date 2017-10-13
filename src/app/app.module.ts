import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

// imports components
import { patientPage } from '../pages/patient/patient';
import { patientDetailsPage } from '../pages/patient-details/patient-details';
import { ListPage } from '../pages/patient-list/patient-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { createEpicMiddleware } from 'redux-observable';

// redux imports
import { combineReducers } from 'redux'
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { RootReducer, AppState, INITIAL_STATE } from '../reducers/rootReducer'
import { PatientEpic } from '../epics';


@NgModule({
	declarations: [
		MyApp,
		patientPage,
		patientDetailsPage,
		ListPage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot(),
		NgReduxModule
	],

	bootstrap: [IonicApp],

	entryComponents: [
		MyApp,
		patientPage,
		patientDetailsPage,
		ListPage
	],
	providers: [
		PatientEpic,
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule {
	constructor(ngRedux: NgRedux<AppState>,
		private patientEpic: PatientEpic) {
		const middleware = [
			createEpicMiddleware(this.patientEpic.Patient),
			createEpicMiddleware(this.patientEpic.saveDataLocally),
			createEpicMiddleware(this.patientEpic.deleteInd)
		]
		ngRedux.configureStore(RootReducer, INITIAL_STATE, middleware)
	}


}
