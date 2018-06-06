import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpHeaders } from '@angular/common/http';

import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule,
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatRippleModule, MatSelectModule, MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { JwtInterceptor } from './services/helpers/jwt.interceptor';
import { fakeBackendProvider } from './services/helpers/fake-backend';
import { ClassComponent } from './pages/class/class.component';
import { ClassService } from './pages/class/services/class.service';
import { StudentComponent } from './pages/student/student.component';
import { StudentService } from './pages/student/services/studnet.service';
import { DeleteDialogComponent } from './pages/class/dialogs/delete/delete.dialog.component';
import { AddStudentDialogComponent } from './pages/student/dialogs/add/add-student.dialog';
import { UserComponent } from './pages/user/user.component';
import { AddUserDialogComponent } from './pages/user/dialogs/add/add-user.dialog';
import { UserService } from './pages/user/services/user.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ComponentsModule,
    RouterModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    AppRoutingModule,
    CdkTableModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ClassComponent,
    StudentComponent,
    DeleteDialogComponent,
    UserComponent,
    AddStudentDialogComponent,
    AddUserDialogComponent
  ],
  entryComponents: [
    AddStudentDialogComponent,
    AddUserDialogComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    ClassService,
    StudentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private httpLink: HttpLink,
    private apollo: Apollo) {
  }

  private initApollo() {
    const http = this.httpLink.create({ uri: 'https://msw-server.azurewebsites.net/graphql' });
    this.apollo.create({
      link: http,
      cache: new InMemoryCache()
    });
  }
}
