import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponce } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'ZNxDAIjL7BSE0CUaATO6Pj6fKWrp9RQS';

@Injectable({ providedIn: 'root' })

export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  constructor(private httpCliente: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if(tag.length === 0) return;

    this.organizeTagsHistory(tag);

    const params = new HttpParams()
    .set('api_key', GIPHY_API_KEY)
    .set('q', tag)
    .set('limit', '10');

    this.httpCliente.get<SearchResponce>(`${this.serviceURL}/search`, { params })
    .subscribe((resp) => {
        this.gifList = resp.data;
      }
    );
  }

  private organizeTagsHistory(tag: string): void {
    tag = tag.toLocaleLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('gifList', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const tags = localStorage.getItem('gifList');
    if (tags) {
      this._tagsHistory = JSON.parse(tags);
      this.searchTag(this._tagsHistory[0]);
    }
  }
}
