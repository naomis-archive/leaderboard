import { Component, OnInit } from '@angular/core';
import { GlobalDataInt } from 'src/interfaces/GlobalDataInt';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
