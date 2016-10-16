import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard.component';
import { CourseComponent } from './course.component';
import { LoginComponent } from './login.component';
import { EditorComponent } from './editor.component';
import { SectionEditComponent } from './editor/section-edit.component';
import { CourseMetadataEditComponent } from './editor/course-metadata-edit.component';
import { ChapterMetadataEditComponent } from './editor/chapter-metadata-edit.component';
import { StorageService } from './shared/storage.service';
import { Utils } from './shared/utils.service';
import { LogService } from './shared/log.service';

import { CoursesService } from './courses.service';
import { RuleEvaluatorService } from './rule-evaluator.service';
import { AuthenticationService } from './authentication.service';
import { LoginGuard } from './login-guard.service';

@NgModule({
    imports: [
        BrowserModule,
        Ng2BootstrapModule,
        FormsModule,
        HttpModule,
        routing
    ],

    declarations: [
        AppComponent,
        HeaderComponent,
        DashboardComponent,
        CourseComponent,
        LoginComponent,
        EditorComponent,
        SectionEditComponent,
        CourseMetadataEditComponent,
        ChapterMetadataEditComponent
    ],
    bootstrap: [AppComponent],
    providers: [CoursesService, RuleEvaluatorService, 
        AuthenticationService, StorageService, LoginGuard, Utils, LogService]
})

export class AppModule {}
