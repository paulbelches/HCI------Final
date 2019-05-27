import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { GlobalService } from '../services/global.service';

export interface Favorito{
  id?: string;
  title : string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})

export class FavoritosService {

  private favCollection: AngularFirestoreCollection<Favorito>;
  private favoritos: Observable<Favorito[]>;

  private cardItems = [];

  constructor(
    private global: GlobalService, 
    private db: AngularFirestore
  ) {
    // console.log("Constructor de favoritos");
    // this.global.idDoc = 'UiOkZnIhayc9mny1APs8';

    console.log(this.global.idDoc);
    // this.favCollection = this.db.collection<Favorito>('persona').doc(this.global.idDoc).collection('favoritos');
    this.favCollection = this.db.collection<Favorito>('persona').doc('UiOkZnIhayc9mny1APs8').collection('favoritos');
    this.favoritos = this.favCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getFavorites() {
    return this.favoritos;
  }

  getFav(id:string): Observable<Favorito> {
    return this.favCollection.doc<Favorito>(id).valueChanges().pipe(
      take(1),
      map(favorito => {
        favorito.id = id;
        return favorito;
      })
    );
  }

  removeFavorite(id): Promise<void> {
    console.log("Se ejecutó el método para eliminar", id);
    return this.favCollection.doc(id).delete();
  }

  addFavorite(favorito: Favorito, docID: string): Promise<void> {
    return this.favCollection.doc(docID).set(favorito);
  }

  checkExistence (docID: string){
    if (this.favCollection.doc(docID).get())
      return true;
    else
      return true;
  }


}
