import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BienvenidaTestPage } from './bienvenida-test.page';

const routes: Routes = [
  {
    path: '',
    component: BienvenidaTestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BienvenidaTestPage]
})
export class BienvenidaTestPageModule {}
