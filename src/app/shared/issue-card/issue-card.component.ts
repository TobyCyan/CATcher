import { Component, Input } from '@angular/core';
import { Issue } from '../../core/models/issue.model';
import { LabelService } from '../../core/services/label.service';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.css']
})
export class IssueCardComponent {
  @Input() issue: Issue;

  constructor(private labelService: LabelService) {}
}
