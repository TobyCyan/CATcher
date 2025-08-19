import { NgModule } from '@angular/core';
import { CardViewComponent } from './card-view.component';
import { IssueCardComponent } from '../issue-card/issue-card.component';
import { PaginatorLocalStorageDirective } from '../../core/directives/paginator-local-storage.directive';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [RouterModule, CommonModule, MaterialModule],
  declarations: [CardViewComponent, IssueCardComponent, PaginatorLocalStorageDirective],
  exports: [CardViewComponent, IssueCardComponent]
})
export class CardViewModule {}
