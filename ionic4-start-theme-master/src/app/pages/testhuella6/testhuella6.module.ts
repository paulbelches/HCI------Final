import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Testhuella6Page } from './testhuella6.page';

const routes: Routes = [
  {
    path: '',
    component: Testhuella6Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Testhuella6Page]
})
export class Testhuella6PageModule {}
