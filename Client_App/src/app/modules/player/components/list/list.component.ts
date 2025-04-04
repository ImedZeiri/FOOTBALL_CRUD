import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  players: any[] = [];
  importFile?: File;
  importStatus = '';
  isImporting = false;
  requiredColumns = ['First name', 'Last name', 'Position', 'Team', 'Age'];

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
        this.loadPlayers();
      },
      (error) => {
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.importFile = file;
    }
    event.target.value = '';
  }

  importPlayers(): void {
    if (!this.importFile) {
      this.importStatus = 'Aucun fichier sélectionné';
      return;
    }

    this.isImporting = true;
    this.importStatus = 'Importation en cours...';

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        if (workbook.SheetNames.length === 0) {
          throw new Error('Le fichier Excel ne contient aucune feuille');
        }
        
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        
        if (jsonData.length < 1) {
          throw new Error('Le fichier Excel est vide');
        }
        
        const headers = jsonData[0] as string[];
        const missingColumns = this.requiredColumns.filter(col => !headers.includes(col));
        
        if (missingColumns.length > 0) {
          throw new Error(`Colonnes manquantes: ${missingColumns.join(', ')}`);
        }
        
        const players = jsonData.slice(1).map((row: any) => {
          const player: any = {};
          this.requiredColumns.forEach((col, index) => {
            player[col.toLowerCase().replace(' ', '_')] = row[headers.indexOf(col)];
          });
          return {
            firstName: player['first_name'],
            lastName: player['last_name'],
            position: player['position'],
            team: player['team'],
            age: player['age']
          };
        }).filter(player => player.firstName && player.lastName);

        if (players.length === 0) {
          throw new Error('Aucun joueur valide trouvé dans le fichier');
        }

        this.playerService.importPlayers(players).subscribe({
          next: (response) => {
            this.importStatus = `Importation réussie: ${players.length} joueurs ajoutés`;
            this.loadPlayers();
            this.isImporting = false;
          },
          error: (err) => {
            this.importStatus = 'Erreur lors de l\'importation: ' + (err.error?.message || err.message || err);
            console.error(err);
            this.isImporting = false;
          }
        });
      } catch (error: any) {
        this.importStatus = 'Erreur: ' + (error.message || 'Format de fichier invalide');
        console.error(error);
        this.isImporting = false;
      }
    };

    fileReader.onerror = () => {
      this.importStatus = 'Erreur de lecture du fichier';
      this.isImporting = false;
    };

    fileReader.readAsArrayBuffer(this.importFile);
    this.loadPlayers();
  }
}