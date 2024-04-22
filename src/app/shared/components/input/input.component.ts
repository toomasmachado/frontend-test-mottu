import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Output() search: EventEmitter<Event> = new EventEmitter<Event>();

  searchValue: string = '';
  isFocused: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(event: Event): void  {
    this.search.emit(event);
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    if(this.searchValue) return;
    this.isFocused = false;
  }
}
