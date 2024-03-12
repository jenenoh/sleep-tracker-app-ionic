import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllLogsPage } from './view-all-logs.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAllLogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAllLogsPageRoutingModule {}
