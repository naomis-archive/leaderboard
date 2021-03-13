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

  constructor(private GetDataService: GetDataService) {}

  ngOnInit(): void {
    this.GetDataService.getData().subscribe((data) => {
      this.data = data;
      this.crowdin = data.crowdin;
      this.loaded = true;
    });
  }
}
