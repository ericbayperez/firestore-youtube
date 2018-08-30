import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Video } from '../../models/video';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  createVideo(videoTitle: string, videoCreator: string, videoDescription: string, videoLink: string): Promise<void>{
   const id = this.firestore.createId();
   return this.firestore.doc(`videos/${id}`).set({
      'id': id,
      'videoTitle': videoTitle,
      'videoCreator': videoCreator,
      'videoDescription': videoDescription,
      'videoLink': videoLink,
    });
  }

  getVideoList(): AngularFirestoreCollection<Video>{
    return this.firestore.collection(`videos`);
  }

  getVideoDetails(videoId: string): AngularFirestoreDocument<Video> {
    return this.firestore.collection(`videos`).doc(videoId);
  }

  deleteVideo(videoId: string): Promise<void> {
    return this.firestore.doc(`videos/${videoId}`).delete();
  }
}
