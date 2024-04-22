import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharacterService } from 'src/app/core/services/character.service';
import { Character } from 'src/app/core/interfaces/character.interface';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, OnDestroy {
  
  characters: Character[] = [];
  getById = this.characterService.getById; 

  constructor(
    private characterService: CharacterService,
  ) { }

  private characterSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.characterService.reset();

    const res = this.characterService.loadCharacters()
      .subscribe(characters => this.characters = characters);

    this.characterSubscription.add(res);
  }

  ngOnDestroy(): void {
    this.characterSubscription.unsubscribe();
  }

  handleSearchInput(target: any): void {
      const res = this.characterService.searchCharacter(target?.value)
        .subscribe(characters => {
          this.characters = characters;
          console.log(this.characters);
          res.unsubscribe();
        });
  }

  onScroll() {
    if (!this.characterService.nextUrl) return;

    const res = this.characterService.loadCharacters()
      .subscribe(characters => {
        this.characters = [...this.characters, ...characters];
      });

    this.characterSubscription.add(res);
  }

  noCharacters(): boolean {
    return this.characters.length === 0;
  }
}
