import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AggregateDataInt,
  AggregateUserInt,
} from 'src/interfaces/AggregateDataInt';
import { GetAggregateService } from '../get-aggregate.service';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css'],
})
export class ContributorComponent implements OnInit {
  public query = '';
  public data: AggregateDataInt | undefined;
  public userData: AggregateUserInt | undefined;
  public loaded = false;
  constructor(
    private route: ActivatedRoute,
    private getAggregate: GetAggregateService
  ) {}

  ngOnInit(): void {
    this.getAggregate.getData().subscribe((data) => {
      this.data = data;
      this.loaded = true;

      this.route.queryParams.subscribe((params) => {
        this.query = params.username;
        const target = this.data?.data.find(
          (el) => el.username === params.username
        );
        this.userData = target;
      });
    });
  }
}
