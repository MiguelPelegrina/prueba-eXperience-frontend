import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

/**
 * Shared module. Contains all the shared components, directives, and pipes used in the application.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
    ],
  declarations: [],
  providers: [],
  exports: [
    CommonModule,
    FormsModule
  ],
})
export class SharedModule {}
