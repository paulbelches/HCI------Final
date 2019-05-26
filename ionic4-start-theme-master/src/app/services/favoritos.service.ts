import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

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

  constructor(private db: AngularFirestore) {
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
    return this.favCollection.doc(id).delete();
  }
}
