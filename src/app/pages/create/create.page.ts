import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public createVideoForm: FormGroup

  ngOnInit(){}
  
  constructor(
    public router : Router,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController,
    public firestoreService : FirestoreService,
    formBuilder: FormBuilder,
  ){
    this.createVideoForm = formBuilder.group({
      videoTitle: ['', Validators.required],
      videoCreator: ['', Validators.required],
      videoDescription: ['', Validators.required],
      videoLink: ['', Validators.required],
    });
  }

  async addVideo(){
    const loading = await this.loadingCtrl.create();

    const videoTitle = this.createVideoForm.value.videoTitle;
    const videoCreator = this.createVideoForm.value.videoCreator;
    const videoDescription = this.createVideoForm.value.videoDescription;
    const videoLink = this.createVideoForm.value.videoLink;

    this.firestoreService
      .createVideo(videoTitle, videoCreator, videoDescription, videoLink)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('');
          });
        },
        error => {
          console.error(error);
        }
      );

    return await loading.present();
    }

}
