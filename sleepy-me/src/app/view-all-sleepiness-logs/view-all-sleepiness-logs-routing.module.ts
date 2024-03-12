import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllSleepinessLogsPage } from './view-all-sleepiness-logs.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAllSleepinessLogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAllSleepinessLogsPageRoutingModule {}
