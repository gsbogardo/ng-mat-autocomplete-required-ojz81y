import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Character } from './character';
import { CharacterSelectionRequiredValidator } from './character-selection-required-validator';
import { SwapiService } from './swapi.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  form: FormGroup;
  options$: Observable<Character[]>;
  filteredOptions$: Observable<Character[]>;
  private filteredOptionsSubject = new BehaviorSubject<Character[]>([]);

  constructor(
    private formBuilder: FormBuilder, 
    private swapiService: SwapiService) {}

  ngOnInit() {
    this.filteredOptions$ = this.filteredOptionsSubject.asObservable();
    this.form = this.formBuilder.group({
      character: [null, CharacterSelectionRequiredValidator]
    });
    this.options$ = this.swapiService.getCharacters$().pipe(tap(o => {
      this.filteredOptionsSubject.next(o);
    }));
  }

  getAutoCompleteDisplayValue(option: Character): string | undefined {
		return option ? option.name : undefined;
	}

	onAutocompleteKeyUp(searchText: string, options: Character[]): void {
		const lowerSearchText = searchText?.toLowerCase();
		this.filteredOptionsSubject.next(
      !lowerSearchText 
      ? options 
      : options.filter(r => r.name.toLocaleLowerCase().includes(lowerSearchText)));
	}
}
