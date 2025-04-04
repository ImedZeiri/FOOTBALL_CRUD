import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() players: any[] = [];
  @Output() view = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @ViewChild('deleteConfirmationModal') deleteModal!: ElementRef;

  filteredPlayers: any[] = [];
  sortedPlayers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';
  selectedPosition: string = 'all';
  positions: string[] = ['Tous', 'Attaquant', 'Milieu', 'Défenseur', 'Gardien'];
  activeTab: string = 'all';
  playerToDelete: any;
  showDeleteModal = false;
  
  ngOnInit(): void {
    this.filterPlayers();
  }

  filterPlayers(): void {
    let result = this.players.filter(player => 
      player.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      player.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.selectedPosition !== 'all') {
      result = result.filter(player => player.position === this.selectedPosition);
    }

    this.filteredPlayers = result;
    this.totalItems = this.filteredPlayers.length;
    this.sortPlayersByAgeDesc();
    this.updateDisplayedPlayers();
  }

  sortPlayersByAgeDesc(): void {
    this.sortedPlayers = [...this.filteredPlayers].sort((a, b) => b.age - a.age);
  }

  updateDisplayedPlayers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.sortedPlayers = [...this.filteredPlayers]
      .sort((a, b) => b.age - a.age)
      .slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedPlayers();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.filterPlayers();
  }

  onPositionChange(): void {
    this.currentPage = 1;
    this.filterPlayers();
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
    this.currentPage = 1;
    this.filterPlayers();
  }

  viewDetails(player: any): void {
    this.view.emit(player.id);
  }

  editPlayer(player: any): void {
    this.edit.emit(player.id);
  }

  deletePlayer(player: any): void {
    this.playerToDelete = player;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
      if (this.playerToDelete) {
          this.delete.emit(this.playerToDelete.id);
          this.closeModal();
      }
  }

  closeModal(): void {
      this.showDeleteModal = false;
      this.playerToDelete = null;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  getDisplayedResults(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
}