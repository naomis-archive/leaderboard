import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-crowdin',
  templateUrl: './crowdin.component.html',
  styleUrls: ['./crowdin.component.css'],
})
export class CrowdinComponent implements OnInit {
  public data: any;
  public crowdin: any;
  public loaded = false;
  public updated: any;

  constructor(private GetDataService: GetDataService) {}

  ngOnInit(): void {
    this.GetDataService.getData().subscribe((data) => {
      this.data = data;
      this.crowdin = data.crowdin;
      this.updated =
        new Date(data.updated_on).toLocaleDateString() +
        ' ' +
        new Date(data.updated_on).toLocaleTimeString();
      this.loaded = true;
    });
  }
}
