import { Directive, ElementRef, effect, inject, input } from '@angular/core';

@Directive({
  selector: '[pokeHighlightText]',
})
export class HighlightTextDirective {
  readonly content = input<string>('');
  readonly query = input<string>('');

  private el = inject(ElementRef<HTMLElement>);

  constructor() {
    effect(() => {
      const query = this.query();
      const content = this.content();
      let innerHtml = content;

      if (query) innerHtml = content.replace(new RegExp(`(${query})`, 'gi'), '<span class="text-color-warning">$1</span>');

      this.el.nativeElement.innerHTML = innerHtml;
    });
  }
}
