import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Testhuella4Page } from './testhuella4.page';

const routes: Routes = [
  {
    path: '',
    component: Testhuella4Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Testhuella4Page]
})
export class Testhuella4PageModule {}
