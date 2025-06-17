import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TemplateService } from '../services/template.service';

export function nameNotTaken(templateService: TemplateService): ValidatorFn {
  return (name: AbstractControl): ValidationErrors | null => {
    if (templateService.isNameTaken(name.value)) {
      return { taken: true };
    }
    return null;
  };
}
