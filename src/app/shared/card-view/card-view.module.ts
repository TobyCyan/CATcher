import { NgModule } from '@angular/core';
import { CardViewComponent } from './card-view.component';
import { SharedModule } from '../shared.module';
import { IssueCardComponent } from '../issue-card/issue-card.component';

@NgModule({
  declarations: [CardViewComponent, IssueCardComponent],
  imports: [SharedModule],
  exports: [CardViewComponent, IssueCardComponent]
})
export class CardViewModule {}
