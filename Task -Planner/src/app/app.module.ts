import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BodyComponent } from './main/components/body/body.component';
import { MainModule } from '@lct/main/main.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserModule,
        MainModule,
        BrowserAnimationsModule
    ],
    bootstrap: [BodyComponent]
})
export class AppModule { }
