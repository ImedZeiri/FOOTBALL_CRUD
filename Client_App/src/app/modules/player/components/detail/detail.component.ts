import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  player: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.playerService.getPlayer(+id).subscribe(
        (data) => {
          this.player = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error loading player details', error);
          this.isLoading = false;
        }
      );
    }
  }
}