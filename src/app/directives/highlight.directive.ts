import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  // Default hover color is yellow, can be overridden by input binding
  @Input('appHighlight') highlightColor: string = 'yellow';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setBgColor(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBgColor(null);
  }

  private setBgColor(color: string | null) {
    // If color is null, it removes the background color
    if (color) {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
      this.renderer.setStyle(this.el.nativeElement, 'color', '#0b0f19'); // Dark text on light hover
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
      this.renderer.removeStyle(this.el.nativeElement, 'color');
    }
  }
}
