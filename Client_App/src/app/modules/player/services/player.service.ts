import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_CONFIG } from 'src/app/core/const';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersData = [
    {
      id: 1,
      firstName: 'player1 FN',
      lastName: 'player1 LN',
      position: 'Attaquant',
      team: 'Team1',
      age: 34,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      firstName: 'player2 FN',
      lastName: 'player2 LN',
      position: 'Attaquant',
      team: 'Team2',
      age: 37,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      firstName: 'player3 FN',
      lastName: 'player3 LN',
      position: 'Milieu',
      team: 'Team3',
      age: 31,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      firstName: 'player4 FN',
      lastName: 'player4 LN',
      position: 'Défenseur',
      team: 'Team4',
      age: 31,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      firstName: 'player5 FN',
      lastName: 'player5 LN',
      position: 'Gardien',
      team: 'Team5',
      age: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      firstName: 'player6 FN',
      lastName: 'player6 LN',
      position: 'Attaquant',
      team: 'Team6',
      age: 34,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor() { }

  getAllPlayers(): Observable<any[]> {
    return of([...this.playersData]);
  }

  getPlayer(id: number): Observable<any> {
    const player = this.playersData.find(p => p.id === id);
    return of(player ? {...player} : null);
  }

  createPlayer(player: any): Observable<any> {
    // Génère un nouvel ID
    const newId = Math.max(...this.playersData.map(p => p.id)) + 1;
    const newPlayer = {
      ...player,
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.playersData.push(newPlayer);
    return of({...newPlayer});
  }

  updatePlayer(id: number, player: any): Observable<any> {
    const index = this.playersData.findIndex(p => p.id === id);
    if (index !== -1) {
      const updatedPlayer = {
        ...this.playersData[index],
        ...player,
        updatedAt: new Date()
      };
      this.playersData[index] = updatedPlayer;
      return of({...updatedPlayer});
    }
    return of(null);
  }

  deletePlayer(id: number): Observable<any> {
    const initialLength = this.playersData.length;
    this.playersData = this.playersData.filter(p => p.id !== id);
    return of({success: initialLength !== this.playersData.length});
  }

  // Méthode utilitaire pour simuler un délai réseau
  private simulateNetworkDelay<T>(data: T): Observable<T> {
    return of(data); // Retirer le setTimeout en production
    // return of(data).pipe(delay(200)); // Pour simuler un délai réseau
  }
}