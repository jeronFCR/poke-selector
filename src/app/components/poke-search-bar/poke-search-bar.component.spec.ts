import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightTextDirective } from '@poke/directives/highlight-text.directive';

import { PokeSearchBarComponent } from './poke-search-bar.component';

describe('PokeSearchBarComponent', () => {
  let component: PokeSearchBarComponent;
  let fixture: ComponentFixture<PokeSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeSearchBarComponent, HighlightTextDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(PokeSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit update when input changes', () => {
    spyOn(component.update, 'emit');

    const autocompleteInput = fixture.nativeElement.querySelector('[data-testid="autocomplete-input"]');
    autocompleteInput.value = 'charmander';

    autocompleteInput.dispatchEvent(new Event('input'));

    expect(component.update.emit).toHaveBeenCalledWith('charmander');
  });

  it('should show list on focus and hide on blur', () => {
    const autocompleteInput = fixture.nativeElement.querySelector('[data-testid="autocomplete-input"]');

    autocompleteInput.dispatchEvent(new Event('focus'));

    expect(component.showList()).toBeTrue();

    autocompleteInput.dispatchEvent(new Event('blur'));

    expect(component.showList()).toBeFalse();
  });

  it('should emit clear when clear button is clicked', () => {
    spyOn(component.clear, 'emit');

    const clearIcn = fixture.nativeElement.querySelector('[data-testid="clear-icon"]');
    clearIcn.click();

    expect(component.clear.emit).toHaveBeenCalled();
  });

  it('should emit selected and hide list on select', () => {
    const pokemon = { name: 'ditto' };

    spyOn(component.selected, 'emit');

    component.onSelect(pokemon);

    expect(component.selected.emit).toHaveBeenCalledWith('ditto');
    expect(component.showList()).toBeFalse();
  });

  it('should emit tab and hide list on Tab keydown', () => {
    spyOn(component.tab, 'emit');

    const event = new KeyboardEvent('keydown', { key: 'Tab' });

    component.onTabPress(event);

    expect(component.tab.emit).toHaveBeenCalled();
    expect(component.showList()).toBeFalse();
  });

  it('should emit scrollEnd when scrolled to bottom', () => {
    const fakeEvent = {
      target: {
        scrollHeight: 100,
        scrollTop: 90,
        clientHeight: 10,
      },
    } as unknown as Event;

    spyOn(component.scrollEnd, 'emit');

    component.onScroll(fakeEvent);
    expect(component.scrollEnd.emit).toHaveBeenCalled();
  });
});
