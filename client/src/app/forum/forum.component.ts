import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  public data: any;
  public forum: any;
  public loaded = false;
  public updated: any;

  constructor(private GetDataService: GetDataService) {}

  ngOnInit(): void {
    this.GetDataService.getData().subscribe((data) => {
      this.data = data;
      this.forum = data.forum;
      this.updated =
        new Date(data.updated_on).toLocaleDateString() +
        ' ' +
        new Date(data.updated_on).toLocaleTimeString();

      this.loaded = true;
    });
  }
}
