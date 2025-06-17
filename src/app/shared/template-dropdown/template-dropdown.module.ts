import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { TemplateDropdownComponent } from './template-dropdown.component';

@NgModule({
  declarations: [TemplateDropdownComponent],
  imports: [CommonModule, SharedModule],
  exports: [TemplateDropdownComponent]
})
export class TemplateDropdownModule {}
