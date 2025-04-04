import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { LoaderComponent } from './loader/loader.component';
import { EmptyDataComponent } from './empty-data/empty-data.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DataTableComponent,
    LoaderComponent,
    EmptyDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    DataTableComponent,
    LoaderComponent,
    EmptyDataComponent
  ],
})
export class SharedModule { }
