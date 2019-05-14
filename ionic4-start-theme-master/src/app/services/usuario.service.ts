import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { defineBase } from '@angular/core/src/render3';

export interface Usuario {
  id?: string,
  email : string;
  nombre : String;
  cantidadDeTierras : number;
  porcentajeAlimentacion : number;
  porcentajeTransporte : number;
  porcentajeEnergetico : number;
  porcentajeContaminacion : number;
  porcentajeAgua : number;
  consumoTotal: number;
  paneles: number;
}


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosCollection: AngularFirestoreCollection<Usuario>;
  private users: Observable<Usuario[]>;

  
  constructor(private db: AngularFirestore ) { 
    this.usuariosCollection = this.db.collection<Usuario>('Usuario');
    this.users = this.usuariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    
  }

  getUsers() {
    return this.users;
  }

  getUser(id:string):Observable<Usuario> {
    return this.usuariosCollection.doc<Usuario>(id).valueChanges().pipe(
        take(1), 
        map(usuario => {
          usuario.id = id;
          return usuario;
      })
    );
  }

  updateUser(user: Usuario, id:string): Promise<void> {
    return this.usuariosCollection.doc(id).update({
      email : user.email,
      nombre : user.nombre,
      cantidadDeTierras : user.cantidadDeTierras,
      porcentajeAlimentacion : user.porcentajeAlimentacion,
      porcentajeTransporte : user.porcentajeTransporte,
      porcentajeEnergetico : user.porcentajeEnergetico,
      porcentajeContaminacion : user.porcentajeContaminacion,
      porcentajeAgua : user.porcentajeAgua,
      consumoTotal: user.consumoTotal,
      paneles: user.paneles});
  }

  addUser(user: Usuario): Promise<DocumentReference>{
    return this.usuariosCollection.add(user);
  }

  removeUser(id): Promise<void>{
    return this.usuariosCollection.doc(id).delete();
  }


}
