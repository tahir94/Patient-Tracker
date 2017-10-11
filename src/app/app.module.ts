import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// angularfire imports
import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { createEpicMiddleware } from 'redux-observable';

// redux imports
import { combineReducers } from 'redux'
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { RootReducer, AppState, INITIAL_STATE } from '../reducers/rootReducer'
import { AuthEpic } from '../epics';


export const firebaseConfig = {
	apiKey: "AIzaSyAttHQcOfQBUTLPppYIzXl93UWFubRd3Tc",
	authDomain: "fir-f0d92.firebaseapp.com",
	databaseURL: "https://fir-f0d92.firebaseio.com",
	projectId: "fir-f0d92",
	storageBucket: "fir-f0d92.appspot.com",
	messagingSenderId: "253516166145"
};

@NgModule({
	declarations: [
		MyApp,
		HelloIonicPage,
		ItemDetailsPage,
		ListPage,
		LoginPage,
		SignupPage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot(),
		AngularFireModule.initializeApp(firebaseConfig),
		//   AngularFireDatabase,
		AngularFireAuthModule,
		NgReduxModule,


	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HelloIonicPage,
		ItemDetailsPage,
		ListPage,
		LoginPage,
		SignupPage
	],
	providers: [
		AuthEpic,
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule {
	constructor(ngRedux: NgRedux<AppState>,
		private authEpic: AuthEpic) {
		const middleware = [
			createEpicMiddleware(this.authEpic.Signup),
			createEpicMiddleware(this.authEpic.saveDataLocally),
			createEpicMiddleware(this.authEpic.deleteInd)
		]
		ngRedux.configureStore(RootReducer, INITIAL_STATE, middleware)
	}


}
