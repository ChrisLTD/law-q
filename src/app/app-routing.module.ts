import { AuthenticatedGuard, CommonUIElementsModule } from 'common-ui-elements'
import { NgModule, ErrorHandler } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'

import { UsersComponent } from './users/users.component'
import { AdminGuard } from './users/AdminGuard'
import { ShowDialogOnErrorErrorHandler } from './common/UIToolsService'
import { terms } from './terms'
import { HelpRequestsComponent } from './help-requests/help-requests.component'
import { VolunteerRequestComponent } from './volunteer-request/volunteer-request.component'
import { AllHelpRequestsComponent } from './all-help-requests/all-help-requests.component'
import { AllVolunteerRequestsComponent } from './all-volunteer-requests/all-volunteer-requests.component'

const defaultRoute = terms.home
const routes: Routes = [
  { path: defaultRoute, component: HomeComponent },
  {
    path: 'בקשות סיוע',
    component: AllHelpRequestsComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'בקשות להתנדב',
    component: AllVolunteerRequestsComponent,
    canActivate: [AuthenticatedGuard],
  },
  { path: HelpRequestsComponent.route, component: HelpRequestsComponent },
  { path: 'הרשמה כעו"ד מתנדב', component: VolunteerRequestComponent },
  {
    path: terms.userAccounts,
    component: UsersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: '**',
    redirectTo: '/' + HelpRequestsComponent.route,
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonUIElementsModule],
  providers: [
    AdminGuard,
    { provide: ErrorHandler, useClass: ShowDialogOnErrorErrorHandler },
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
