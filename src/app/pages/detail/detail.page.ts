import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Video } from '../../models/video';
import { FirestoreService } from '../../services/data/firestore.service';
import { Observable } from 'rxjs';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public video : Observable<Video>;
  public videoId: string;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.videoId = this.route.snapshot.paramMap.get('id');
    this.video = this.firestoreService.getVideoDetails(this.videoId).valueChanges();
  }
  async deleteVideo() {
    let alert = await this.alertController.create({
      header: "Confirm Delete",
      message: "Are you sure you want to delete this video?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel Clicked!');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.firestoreService.deleteVideo(this.videoId).then(()=>{
              this.router.navigateByUrl('');
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
