import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css'],
})
export class GithubComponent implements OnInit {
  public data: any;
  public github: any;
  public loaded = false;
  public updated: any;

  constructor(private GetDataService: GetDataService) {}

  ngOnInit(): void {
    this.GetDataService.getData().subscribe((data) => {
      this.data = data;
      this.github = data.github;
      this.updated =
        new Date(data.updated_on).toLocaleDateString() +
        ' ' +
        new Date(data.updated_on).toLocaleTimeString();

      this.loaded = true;
    });
  }
}
