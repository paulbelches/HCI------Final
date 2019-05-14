import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Testhuella7Page } from './testhuella7.page';

const routes: Routes = [
  {
    path: '',
    component: Testhuella7Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Testhuella7Page]
})
export class Testhuella7PageModule {}
