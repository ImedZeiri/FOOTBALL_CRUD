import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  players: any[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getAllPlayers().subscribe(
      (data) => {
        this.players = data;
      },
      (error) => {
        console.error('Error loading players', error);
      }
    );
  }

  deletePlayer(id: number): void {
    if (confirm('Are you sure you want to delete this player?')) {
      this.playerService.deletePlayer(id).subscribe(
        () => {
          this.loadPlayers();
        },
        (error) => {
          console.error('Error deleting player', error);
        }
      );
    }
  }
}