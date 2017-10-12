import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { patientDetailsPage } from '../patient-details/patient-details';
import { NgRedux, select } from "ng2-redux";
import { AppState } from '../../reducers/rootReducer';
import { Observable } from 'rxjs/Observable';
import { SET_DATA_LOCALLLY } from '../../actions/patient';

@Component({
	selector: 'page-patient-list',
	templateUrl: 'patient-list.html'
})
export class ListPage {
	items: Object[];
	icons: string[];
	localData; 
	// items: Array<{ title: string, note: string, icon: string }>;

	@select((s: AppState) => s.auth.patientData) patientData$: Observable<Array<any>>
	@select((s: AppState) => s.auth.patientLocalData) localData$: Observable<Array<any>>

	constructor(private ngRedux: NgRedux<AppState>, public navCtrl: NavController, public navParams: NavParams) {
		console.log(this.ngRedux.getState());

		this.patientData$.subscribe((data) => {
			console.log('list log : ', data);
			if (data) {
				this.ngRedux.dispatch({
					type: SET_DATA_LOCALLLY,
					payload: data
				})
			}
		})
		this.localData$.subscribe((data)=>{
			this.localData = data;
			console.log('local data',data);
			this.initList()
		})
		
		this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
		'american-football', 'boat', 'bluetooth', 'build'];
		
		this.items = [];
		for (let i = 1; i < 11; i++) {
			this.items.push({
				title: 'Item ' + i,
				note: 'This is item #' + i,
				icon: this.icons[Math.floor(Math.random() * this.icons.length)]
			});
		}
	
		
	}
	
	getItems(ev) {
		// Reset items back to all of the items
		this.initList();
	
		// set val to the value of the ev target
		var val = ev.target.value;
		console.log(val)
		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
		  this.items = this.items.filter((item) => {
			// return (item['patientName'].toLowerCase().indexOf(val.toLowerCase()) > -1);
		  })
		}
	  }
	initList() {
		this.items = this.localData
	}
	
	itemTapped(event, item, index) {
		this.navCtrl.push(patientDetailsPage, {
			item,
			index
		});
	}
}
