import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { LoaderComponent } from './loader/loader.component';
import { EmptyDataComponent } from './empty-data/empty-data.component';



@NgModule({
  declarations: [
    DataTableComponent,
    LoaderComponent,
    EmptyDataComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
