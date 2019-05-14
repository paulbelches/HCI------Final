import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface persona {
  id?: string,
  email : string;
  nombre : String;
}
@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private personasCollection: AngularFirestoreCollection<persona>;
  private personas: Observable<persona[]>;

  
  constructor(private db: AngularFirestore ) { 
    this.personasCollection = this.db.collection<persona>('persona');
    this.personas = this.personasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    
  }

  getpersonas() {
    return this.personas;
  }

  getpersona(id:string):Observable<persona> {
    return this.personasCollection.doc<persona>(id).valueChanges().pipe(
        take(1), 
        map(persona => {
          persona.id = id;
          return persona;
      })
    );
  }

  updatepersona(persona: persona, id:string): Promise<void> {
    return this.personasCollection.doc(id).update({
      email : persona.email,
      nombre : persona.nombre
    });
  }

  addpersona(persona: persona): Promise<DocumentReference>{
    return this.personasCollection.add(persona);
  }

  removepersona(id): Promise<void>{
    return this.personasCollection.doc(id).delete();
  }


}

