import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { 
    path: 'auth', 
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) 
  },
  { 
    path: 'players', 
    loadChildren: () => import('./modules/player/player.module').then(m => m.PlayerModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/players', pathMatch: 'full' },
  { path: '**', redirectTo: '/players' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }