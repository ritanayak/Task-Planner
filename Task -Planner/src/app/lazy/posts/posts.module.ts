import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletPostsComponent } from './outlet-posts/outlet-posts.component';

const COMPONENTS = [
    OutletPostsComponent
];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
    imports: [
        CommonModule
    ]
})
export class PostsModule { }
