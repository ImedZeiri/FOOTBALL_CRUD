import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  playerId: number | null = null;
  isLoading = true;
  isUpdating = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService
  ) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      team: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(16), Validators.max(50)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.playerId = +id;
      this.playerService.getPlayer(this.playerId).subscribe(
        (player) => {
          this.editForm.patchValue(player);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error loading player', error);
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.playerId) {
      this.isUpdating = true;
      this.playerService.updatePlayer(this.playerId, this.editForm.value).subscribe(
        () => {
          this.router.navigate(['/players', this.playerId]);
        },
        (error) => {
          console.error('Error updating player', error);
          this.isUpdating = false;
        }
      );
    }
  }
}