import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/service/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get tagsHistory(): string[] {
    return this.gifsService.tagsHistory;
  }

  searchGifByTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}
