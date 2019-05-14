import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'register/:id', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'home-results/:usuario', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'energy', loadChildren: './pages/energy/energy.module#EnergyPageModule' },
  { path: 'bienvenida-test', loadChildren: './pages/bienvenida-test/bienvenida-test.module#BienvenidaTestPageModule' },
  { path: 'testhuella1', loadChildren: './pages/testhuella1/testhuella1.module#Testhuella1PageModule' },
  { path: 'testhuella2/:myid', loadChildren: './pages/testhuella2/testhuella2.module#Testhuella2PageModule' },
  { path: 'testhuella3/:myid2/:myid3', loadChildren: './pages/testhuella3/testhuella3.module#Testhuella3PageModule' },
  { path: 'testhuella4/:myid4/:myid5/:myid6', loadChildren: './pages/testhuella4/testhuella4.module#Testhuella4PageModule' },
  { path: 'testhuella5/:myid7/:myid8/:myid9/:myid10', loadChildren: './pages/testhuella5/testhuella5.module#Testhuella5PageModule' },
  { path: 'testhuella6/:myid11/:myid12/:myid13/:myid14/:myid15', loadChildren: './pages/testhuella6/testhuella6.module#Testhuella6PageModule' },
  { path: 'testhuella7/:myid16/:myid17/:myid18/:myid19/:myid20/:myid21', loadChildren: './pages/testhuella7/testhuella7.module#Testhuella7PageModule' },
  { path: 'testhuella8/:myid22/:myid23/:myid24/:myid25/:myid26/:myid27/:myid28', loadChildren: './pages/testhuella8/testhuella8.module#Testhuella8PageModule' },
  { path: 'testhuella9/:myid29/:myid30/:myid31/:myid32/:myid33/:myid34/:myid35/:myid36', loadChildren: './pages/testhuella9/testhuella9.module#Testhuella9PageModule' },
  { path: 'testhuellaresultado/:myid37/:myid38/:myid39/:myid40/:myid41/:myid42/:myid43/:myid44/:myid45', loadChildren: './pages/testhuellaresultado/testhuellaresultado.module#TesthuellaresultadoPageModule' },
  { path: 'calculate-enery/:myLista', loadChildren: './pages/calculate-enery/calculate-enery.module#CalculateEneryPageModule' },
  { path: 'graphics', loadChildren: './pages/graphics/graphics.module#GraphicsPageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
