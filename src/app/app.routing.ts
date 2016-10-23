import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CourseComponent } from './course.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EditorComponent } from './editor/editor.component';
import { ChapterMetadataEditComponent } from './editor/chapter-metadata-edit/chapter-metadata-edit.component';
import { CourseMetadataEditComponent } from './editor/course-metadata-edit/course-metadata-edit.component';
import { SectionEditComponent } from './editor/section-edit/section-edit.component';
import { CoursePreviewComponent } from './course-preview/course-preview.component';

import { LoginGuard } from './login/login-guard.service';
import { SignupGuard } from './signup/signup-guard.service';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'course/:id',
        component: CoursePreviewComponent
    },
    {
        path: 'course/:id/chapter/:chapter/section/:section',
        component: CourseComponent
    },
    {
        path: 'editor/course/:courseId',
        component: EditorComponent,
        children: [
            { path: 'chapter/:chapterId/section/:sectionId', component: SectionEditComponent },
            { path: 'chapter/:chapterId/metadata', component: ChapterMetadataEditComponent },
            { path: '**', component: CourseMetadataEditComponent }
        ]
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [SignupGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);