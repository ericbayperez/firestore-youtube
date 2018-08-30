import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Video } from '../../models/video';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  createVideo(videoTitle: string, videoCreator: string, videoDescription: string, videoLink: string): Promise<void>{
    const id = this.firestore.createId();
   return this.firestore.doc(`videos/${id}`).set({
      'videoTitle': videoTitle,
      'videoCreator': videoCreator,
      'videoDescription': videoDescription,
      'videoLink': videoLink,
    });
  }
}
