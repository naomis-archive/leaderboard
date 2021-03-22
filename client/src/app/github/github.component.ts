import { Component, OnInit } from '@angular/core';
import { GithubDataInt, GlobalDataInt } from 'src/interfaces/GlobalDataInt';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css'],
})
export class GithubComponent implements OnInit {
  public data: GlobalDataInt | undefined;
  public github: GithubDataInt[] | undefined;
  public loaded = false;
  public updated: string | undefined;

  constructor(private getDataService: GetDataService) {}

  ngOnInit(): void {
    this.getDataService.getData().subscribe((data) => {
      this.data = data;
      this.github = data.github;
      this.updated =
        new Date(data.updated_on).toLocaleDateString() +
        ' ' +
        new Date(data.updated_on).toLocaleTimeString();

      this.loaded = true;
    });
  }
  onImgError(event: any) {
    event.target.src = '../assets/img/default-avatar.png';
  }
}
