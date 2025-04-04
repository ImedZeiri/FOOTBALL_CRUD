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

  private simulateNetworkDelay<T>(data: T): Observable<T> {
    return of(data);
  }

  importPlayers(players: any[]): Observable<any> {
    try {
      let maxId = this.playersData.length > 0 
        ? Math.max(...this.playersData.map(p => p.id)) 
        : 0;
      
      const newPlayers = players.map(player => {
        if (!player.firstName || !player.lastName) {
          throw new Error('Les joueurs doivent avoir un prénom et un nom');
        }
        
        maxId += 1;
        return {
          ...player,
          id: maxId,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      });
      
      this.playersData.push(...newPlayers);
      
      return of({
        success: true,
        count: newPlayers.length,
        message: `${newPlayers.length} joueurs importés avec succès`
      });
    } catch (error: any) {
      return of({
        success: false,
        message: error.message || 'Erreur lors de l\'importation des joueurs'
      });
    }
  }
}