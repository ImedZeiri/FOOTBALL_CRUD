import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../core/const';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.PLAYERS_ENDPOINT}`;

  constructor(private http: HttpClient) { }

  getAllPlayers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPlayer(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPlayer(player: any): Observable<any> {
    return this.http.post(this.apiUrl, player);
  }

  updatePlayer(id: number, player: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, player);
  }

  deletePlayer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}