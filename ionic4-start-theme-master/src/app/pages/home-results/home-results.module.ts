import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PopmenuComponent } from './../../components/popmenu/popmenu.component';

import { HomeResultsPage } from './home-results.page';

import { NavController } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: HomeResultsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeResultsPage, PopmenuComponent]
})
export class HomeResultsPageModule  {

  username = null;

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute
  ){}

  
  goToEnergy() {
    this.navCtrl.navigateRoot('/enery');
  }
}
