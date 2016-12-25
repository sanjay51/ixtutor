import { StorageService } from './../shared/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  category: string = "feature request";
  details: string;
  isSuccessMessageVisible = false;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

  submit() {
    let observable = this.storageService.submitFeedback(this.category, this.details);

    observable.subscribe(response => {
      if (response == "false") {
        //show error
      } else {
        this.showSuccessMessage();
      }
    });
  }

  showSuccessMessage() {
    this.isSuccessMessageVisible = true;
  }

}
