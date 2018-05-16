import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Camp} from '../camp';
import * as firebase from 'firebase';

@Component({
  selector: 'app-campground-details',
  templateUrl: './campground-details.component.html',
  styleUrls: ['./campground-details.component.css']
})
export class CampgroundDetailsComponent implements OnInit {
  private dbPath = '/camps';
  campDetails: AngularFireList<Camp> = null;
  details: any;
  comment: any;
  public key: string;
  postedBy: any;
  user: any;
  loginMessage: any;

  constructor(private router: Router, private db: AngularFireDatabase) {
      this.key = this.router.url.slice(13);
    this.campDetails = db.list(this.dbPath, ref => ref.orderByChild('key').equalTo(this.key));
    this.campDetails.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(details => {
      this.details = details;
    });
  }

  ngOnInit() {
    this.checkUser();
  }
  checkUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.postedBy = user.displayName;
        console.log('if true');
      } else {
        this.user = user;
        this.loginMessage = 'You need to be logged in to react';
        console.log('else true');
      }
    });
  }
  submitComment(comment: string) {
    console.log('comment submitted');
  }
  onSubmit(formData) {
    this.submitComment(
      formData.value.comment
    );
  }
}
