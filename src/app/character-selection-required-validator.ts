import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Character } from './character';

// Leverage TypeScript type guards to check to see if we have a Character type selected
function instanceOfCharacter(character: any): character is Character {
    return !!character // truthy
    && typeof character !== 'string' // Not just string input in the autocomplete
    && 'name' in character; // Has some qualifying property of Character type
}

export const CharacterSelectionRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
		!instanceOfCharacter(control?.value) ? { matchRequired: true } : null;



