import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_CONFIG } from 'src/app/core/const';

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

  importPlayers(players: any[]): Observable<any[]> {
    const validPlayers = players.filter(p => p.firstName && p.lastName);
    
    if (validPlayers.length === 0) {
      return of([]);
    }
    const creationRequests = validPlayers.map(player => 
      this.http.post(this.apiUrl, player).pipe(
        catchError(error => of({ error, player }))
      )
    );
    return forkJoin(creationRequests);
  }
}