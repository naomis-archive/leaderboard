import { Component, OnInit } from '@angular/core';
import { ForumDataInt, GlobalDataInt } from 'src/interfaces/GlobalDataInt';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  public data: GlobalDataInt | undefined;
  public forum: ForumDataInt[] | undefined;
  public loaded = false;
  public updated: string | undefined;

  constructor(private getDataService: GetDataService) {}

  ngOnInit(): void {
    this.getDataService.getData().subscribe((data) => {
      this.data = data;
      this.forum = data.forum;
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
