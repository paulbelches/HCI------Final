import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { GlobalService } from '../services/global.service';

export interface Favorito{
  id?: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})

export class FavoritosService {

  private favCollection: AngularFirestoreCollection<Favorito>;
  private favoritos: Observable<Favorito[]>;
  private singleFavorito: Observable<Favorito>;
  private docRef: DocumentReference;

  private cardItems = [];

  constructor(
    private global: GlobalService,
    private db: AngularFirestore
  ) {

    this.favCollection = this.db.collection<Favorito>('persona').doc(this.global.idDoc).collection('favoritos');
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
    this.favCollection = this.db.collection<Favorito>('persona').doc(this.global.idDoc).collection('favoritos');
    this.favoritos = this.favCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.favoritos;
  }

  getFav(id:string): Observable<Favorito> {
    this.favCollection = this.db.collection<Favorito>('persona').doc(this.global.idDoc).collection('favoritos');
    return this.favCollection.doc<Favorito>(id).valueChanges().pipe(
      take(1),
      map(favorito => {
        favorito.id = id;
        return favorito;
      })
    );
  }

  removeFavorite(id): Promise<void> {
    this.favCollection = this.db.collection<Favorito>('persona').doc(this.global.idDoc).collection('favoritos');

    console.log("Se ejecutó el método para eliminar", id);
    return this.favCollection.doc(id).delete();
  }

  addFavorite(favorito: Favorito, docID: string): Promise<void> {
    return this.favCollection.doc(docID).set(favorito);
  }

  checkExistence (docID: string){
    this.favCollection = this.db.collection<Favorito>('persona').doc(this.global.idDoc).collection('favoritos');
    this.favoritos = this.favCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    var existe;

    this.favoritos.forEach(element => {
      element.forEach(item => {
        if (item.id == docID){
          existe = false;
          return false;
        }
      })
    });

    if (!existe){
      return false;
    } else {
      return true;
    }

  }

  updateFavorite(docID:string, valor:number): Promise<void> {
    return this.favCollection.doc(docID).set({
      value: valor+1
    });
  }
}