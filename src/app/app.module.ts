import { UIInteractionService } from './shared/ui-interaction.service';
import { InstructionsEditorWidgetComponent } from './editor/instructions-editor-widget/instructions-editor-widget.component';
import { EditorHelperService } from './editor/editor-helper.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Autosize } from 'angular2-autosize/angular2-autosize';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard.component';
import { CourseComponent } from './course.component';
import { LoginComponent } from './login/login.component';
import { EditorComponent } from './editor/editor.component';
import { SectionEditComponent } from './editor/section-edit/section-edit.component';
import { CourseMetadataEditComponent } from './editor/course-metadata-edit/course-metadata-edit.component';
import { ChapterMetadataEditComponent } from './editor/chapter-metadata-edit/chapter-metadata-edit.component';
import { StorageService } from './shared/storage.service';
import { Utils } from './shared/utils.service';
import { LogService } from './shared/log.service';
import { ValidatorService } from './shared/validator.service';
import { ImageHelperService } from './shared/image-helper.service';
import { MarkupHelperService } from './shared/markup-helper.service';

import { CoursesService } from './shared/courses.service';
import { RuleEvaluatorService } from './rule-evaluator.service';
import { AuthenticationService } from './shared/authentication.service';
import { LoginGuard } from './login/login-guard.service';
import { SignupGuard } from './signup/signup-guard.service';
import { CoursePreviewComponent } from './course-preview/course-preview.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { FooterComponent } from './footer/footer.component';
import { EditorOptionsComponent } from './editor/editor-options/editor-options.component';
import { FeedbackComponent } from './feedback/feedback.component';

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
        ChapterMetadataEditComponent,
        CoursePreviewComponent,
        SignupComponent,
        ProfileComponent,
        NewCourseComponent,
        FooterComponent,
        EditorOptionsComponent,
        InstructionsEditorWidgetComponent,
        Autosize,
        FeedbackComponent
    ],
    bootstrap: [AppComponent],
    providers: [CoursesService, RuleEvaluatorService,
        AuthenticationService, StorageService, LoginGuard,
        SignupGuard, ValidatorService, Utils, LogService,
        ImageHelperService, MarkupHelperService, EditorHelperService,
        UIInteractionService]
})

export class AppModule { }
