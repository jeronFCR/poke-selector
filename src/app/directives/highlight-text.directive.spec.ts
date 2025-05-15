import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightTextDirective } from './highlight-text.directive';

@Component({
  imports: [HighlightTextDirective],
  template: `<span pokeHighlightText [content]="content" [query]="query"></span>`,
})
class TestComponent {
  content = 'pikachu';
  query = '';
}

describe('HighlightTextDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render content without highlight when query is empty', () => {
    component.content = 'pikachu';
    component.query = '';

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').innerHTML).toBe('pikachu');
  });

  it('should highlight the query', () => {
    component.content = 'pikachu';
    component.query = 'ka';

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').innerHTML).toBe('pi<span class="text-color-accent">ka</span>chu');
  });

  it('should be case-insensitive', () => {
    component.content = 'pikachu';
    component.query = 'IK';

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').innerHTML).toBe('p<span class="text-color-accent">ik</span>achu');
  });
});
