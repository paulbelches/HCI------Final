import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface calculadora {
  id?: string,
  email : string;
  consumoTotal: number;
  paneles: number;
  fecha: string;
}
@Injectable({
  providedIn: 'root'
})
export class CalculadoraEnergeticaService {
  private calculadorasCollection: AngularFirestoreCollection<calculadora>;
  private calculadoras: Observable<calculadora[]>;

  
  constructor(private db: AngularFirestore ) { 
    this.calculadorasCollection = this.db.collection<calculadora>('calculadora');
    this.calculadoras = this.calculadorasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    
  }

  getcalculadoras() {
    return this.calculadoras;
  }

  getcalculadora(id:string):Observable<calculadora> {
    return this.calculadorasCollection.doc<calculadora>(id).valueChanges().pipe(
        take(1), 
        map(calculadora => {
          calculadora.id = id;
          return calculadora;
      })
    );
  }

  updatecalculadora(calculadora: calculadora, id:string): Promise<void> {
    return this.calculadorasCollection.doc(id).update({
      email : calculadora.email,
      consumoTotal : calculadora.consumoTotal,
      paneles : calculadora.paneles
    });
  }

  addcalculadora(calculadora: calculadora): Promise<DocumentReference>{
    return this.calculadorasCollection.add(calculadora);
  }

  removecalculadora(id): Promise<void>{
    return this.calculadorasCollection.doc(id).delete();
  }


}
