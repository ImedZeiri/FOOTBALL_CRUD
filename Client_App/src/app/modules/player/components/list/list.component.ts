import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  players: any[] = [];

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) { }

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

  onView(id: number): void {
    this.router.navigate(['/players', id]);
  }

  onEdit(id: number): void {
    this.router.navigate(['/players', id, 'edit']);
  }

  onDelete(id: number): void {
    this.playerService.deletePlayer(id).subscribe(
      () => {
        this.loadPlayers(); // Recharger la liste après suppression
      },
      (error) => {
        console.error('Error deleting player', error);
      }
    );
  }
}