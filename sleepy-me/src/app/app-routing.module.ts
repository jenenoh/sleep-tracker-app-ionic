import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'view-all-logs',
    loadChildren: () => import('./view-all-logs/view-all-logs.module').then( m => m.ViewAllLogsPageModule)
  },
  {
    path: 'view-all-sleepiness-logs',
    loadChildren: () => import('./view-all-sleepiness-logs/view-all-sleepiness-logs.module').then( m => m.ViewAllSleepinessLogsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
