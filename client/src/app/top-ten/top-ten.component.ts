import { Component, OnInit } from '@angular/core';
import { AggregateDataInt } from 'src/interfaces/AggregateDataInt';
import { GetAggregateService } from '../get-aggregate.service';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.css'],
})
export class TopTenComponent implements OnInit {
  public data: AggregateDataInt | any;
  public loaded = false;
  constructor(private getDataService: GetAggregateService) {}

  ngOnInit(): void {
    this.getDataService.getData().subscribe((data) => {
      data.data.sort((a, b) => b.aggregate - a.aggregate);
      data.updated = new Date(data.updated).toLocaleDateString();
      this.data = data;
      this.loaded = true;
    });
  }
  onImgError(event: any) {
    event.target.src = '../assets/img/default-avatar.png';
  }
}
