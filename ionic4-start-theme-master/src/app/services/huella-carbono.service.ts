import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Huella {
  id?: string,
  email : string;
  cantidadDeTierras : number;
  porcentajeAlimentacion : number;
  porcentajeTransporte : number;
  porcentajeEnergetico : number;
  porcentajeContaminacion : number;
  porcentajeAgua : number;
  fecha: string;
}
@Injectable({
  providedIn: 'root'
})
export class HuellaCarbonoService {
  private huellasCollection: AngularFirestoreCollection<Huella>;
  private huellas: Observable<Huella[]>;

  
  constructor(private db: AngularFirestore ) { 
    this.huellasCollection = this.db.collection<Huella>('Huella');
    this.huellas = this.huellasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    
  }

  getHuellas() {
    return this.huellas;
  }

  getHuella(id:string):Observable<Huella> {
    return this.huellasCollection.doc<Huella>(id).valueChanges().pipe(
        take(1), 
        map(huella => {
          huella.id = id;
          return huella;
      })
    );
  }

  updateHuella(huella: Huella, id:string): Promise<void> {
    return this.huellasCollection.doc(id).update({
      email : huella.email,
      cantidadDeTierras : huella.cantidadDeTierras,
      porcentajeAlimentacion : huella.porcentajeAlimentacion,
      porcentajeTransporte : huella.porcentajeTransporte,
      porcentajeEnergetico : huella.porcentajeEnergetico,
      porcentajeContaminacion : huella.porcentajeContaminacion,
      porcentajeAgua : huella.porcentajeAgua
    
    });
  }

  addHuella(huella: Huella): Promise<DocumentReference>{
    return this.huellasCollection.add(huella);
  }

  removeHuella(id): Promise<void>{
    return this.huellasCollection.doc(id).delete();
  }


}
