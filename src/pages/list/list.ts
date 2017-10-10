import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { NgRedux,select } from "ng2-redux";
import { AppState } from '../../reducers/rootReducer';
import { Observable } from 'rxjs/Observable';
import { SET_DATA_LOCALLLY } from '../../actions/auth';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  @select((s : AppState)=> s.auth.patientData) patientData$ : Observable<Array<any>>

  constructor(private ngRedux : NgRedux<AppState>,public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.ngRedux.getState());

    this.patientData$.subscribe((data)=> {
      console.log('list log : ',data);
      if(data){
        this.ngRedux.dispatch({
          type : SET_DATA_LOCALLLY,
          payload : data
        })
      }
      
    })
    
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }
  
  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
