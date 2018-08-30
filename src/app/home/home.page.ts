import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../models/video';
import { FirestoreService } from '../services/data/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  public videoList;

  constructor(    
    private firestoreService: FirestoreService,
    private router: Router
  ){}

  ngOnInit(){
    this.videoList = this.firestoreService.getVideoList().valueChanges();
  }

}
