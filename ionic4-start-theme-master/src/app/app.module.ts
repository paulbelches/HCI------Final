import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Modal Pages
import { ImagePageModule } from './pages/modal/image/image.module';
import { SearchFilterPageModule } from './pages/modal/search-filter/search-filter.module';

// Components
import { NotificationsComponent } from './components/notifications/notifications.component';


//firebase
import firebaseConfig from './firebase'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, DefaultFirestoreSettings, FirestoreSettingsToken } from '@angular/fire/firestore';
import { HomeResultsPageModule } from './pages/home-results/home-results.module';
import { Testhuella1PageModule } from './pages/testhuella1/testhuella1.module';
import { Testhuella2PageModule } from './pages/testhuella2/testhuella2.module';
import { Testhuella3PageModule } from './pages/testhuella3/testhuella3.module';
import { Testhuella4PageModule } from './pages/testhuella4/testhuella4.module';
import { Testhuella5PageModule } from './pages/testhuella5/testhuella5.module';
import { Testhuella6PageModule } from './pages/testhuella6/testhuella6.module';
import { Testhuella7PageModule } from './pages/testhuella7/testhuella7.module';
import { Testhuella8PageModule } from './pages/testhuella8/testhuella8.module';
import { Testhuella9PageModule } from './pages/testhuella9/testhuella9.module';
import { TesthuellaresultadoPageModule } from './pages/testhuellaresultado/testhuellaresultado.module';
import { CalculateEneryPageModule } from './pages/calculate-enery/calculate-enery.module';
import { GlobalService } from './services/global.service';

@NgModule({
  declarations: [AppComponent, NotificationsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ImagePageModule,
    SearchFilterPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule ,
    AngularFireAuthModule,
    HomeResultsPageModule,
    
    AngularFireAuthModule,
    Testhuella1PageModule,
    Testhuella2PageModule,
    Testhuella3PageModule,
    Testhuella4PageModule,
    Testhuella5PageModule,
    Testhuella6PageModule,
    Testhuella7PageModule,
    Testhuella8PageModule,
    Testhuella9PageModule,
    TesthuellaresultadoPageModule,
    CalculateEneryPageModule,

  ],
  entryComponents: [NotificationsComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
    GlobalService
  ],
  bootstrap: [AppComponent]
})


export class AppModule {}
