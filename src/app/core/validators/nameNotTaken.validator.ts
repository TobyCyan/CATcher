import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IssueTemplateService } from '../services/issue-template.service';

export function nameNotTaken(templateService: IssueTemplateService): ValidatorFn {
  return (name: AbstractControl): ValidationErrors | null => {
    if (templateService.isNameTaken(name.value)) {
      return { taken: true };
    }
    return null;
  };
}
