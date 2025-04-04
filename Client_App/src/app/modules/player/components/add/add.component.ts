import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { PlayerPosition } from 'src/app/core/models/position.enum';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  addForm: FormGroup;
  isSubmitting = false;
  positions = Object.values(PlayerPosition);

  constructor(private fb: FormBuilder, private playerService: PlayerService, private router: Router) {
    this.addForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      team: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(16)]]
    });
  }

  onSubmit(): void {
    if (this.addForm.invalid) return;

    this.isSubmitting = true;
    this.playerService.createPlayer(this.addForm.value).subscribe(() => {
      this.isSubmitting = false;
      this.router.navigate(['/players']);
    });
  }
}
