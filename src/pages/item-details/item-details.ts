import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { DELETE } from '../../actions/auth';
import { NgRedux } from "ng2-redux";
import { AppState } from '../../reducers/rootReducer'
@Component({
	selector: 'page-item-details',
	templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
	selectedItem: any;
	index: Number;
	constructor(private ngRedux : NgRedux<AppState>,public navCtrl: NavController, public navParams: NavParams) {
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');
		this.index = navParams.get('index');
		console.log('item', this.selectedItem)
	}
	keys(a) {
		return Object.keys(a)

	}
	deleteInd() {
		console.log(this.index)
		this.ngRedux.dispatch({
			type: DELETE,
			payload: this.index,
			navCtrl: () => this.navCtrl.pop()
		})
	}
}

