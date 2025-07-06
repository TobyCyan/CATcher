import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISSUE_TEMPLATE_COMPONENTS, ViewIssueTemplateComponent } from '../../shared/view-issue-template/view-issue-template.component';

@Component({
  selector: 'app-issue-template',
  templateUrl: './issue-template.component.html',
  styleUrls: ['./issue-template.component.css']
})
export class IssueTemplateComponent implements OnInit {
  issueTemplateName: string;

  readonly issueTemplateComponents: ISSUE_TEMPLATE_COMPONENTS[] = [
    ISSUE_TEMPLATE_COMPONENTS.SEVERITY_LABEL,
    ISSUE_TEMPLATE_COMPONENTS.TYPE_LABEL,
    ISSUE_TEMPLATE_COMPONENTS.TESTER_POST
  ];

  @ViewChild(ViewIssueTemplateComponent, { static: true }) viewIssueTemplate: ViewIssueTemplateComponent;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.issueTemplateName = params['issue_template_name'];
    });
  }

  canDeactivate(): boolean {
    return true;
  }
}
