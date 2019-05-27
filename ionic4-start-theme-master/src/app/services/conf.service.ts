import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface conf {
  id?: string,
  persona : string;
  magnitud : number;
  melodia: number;
  rango: number;
  repeticionAlarm: number;
  repeticionVibra: number;
  volumen: number;

}
@Injectable({
  providedIn: 'root'
})
export class ConfService {
  private confCollection: AngularFirestoreCollection<conf>;
  private confs: Observable<conf[]>;

  
  constructor(private db: AngularFirestore ) { 
    this.confCollection = this.db.collection<conf>('Configuraciones');
    this.confs = this.confCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    
  }

  getConfs() {
    return this.confs;
  }

  getConf(id:string):Observable<conf> {
    return this.confCollection.doc<conf>(id).valueChanges().pipe(
        take(1), 
        map(conf => {
          conf.id = id;
          return conf;
      })
    );
  }

  updateConf(conf: conf, id:string): Promise<void> {
    return this.confCollection.doc(id).update({
      persona : conf.persona,
      magnitud : conf.magnitud,
      melodia: conf.melodia,
      rango: conf.rango,
      repeticionAlarm: conf.repeticionAlarm,
      repeticionVibra: conf.repeticionVibra,
      volumen: conf.volumen,
    
    });
  }

  addConf(conf:conf): Promise<DocumentReference>{
    return this.confCollection.add(conf);
  }

  removeConf(id): Promise<void>{
    return this.confCollection.doc(id).delete();
  }


}
