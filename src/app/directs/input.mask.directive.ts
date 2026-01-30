import {Directive, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
  standalone: true,
  selector: '[inputMask]'
})
export class InputMaskDirective {
  @Input() inputMask: string = '';
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const originalValue = input.value.replace(/\D/g, '');
    let maskedValue = '';

    let valueIndex = 0;
    for (let maskIndex = 0; maskIndex < this.inputMask.length; maskIndex++) {
      if (/\d/.test(this.inputMask[maskIndex])) {
        if (originalValue[valueIndex]) {
          maskedValue += originalValue[valueIndex++];
        } else {
          break;
        }
      } else {
        maskedValue += this.inputMask[maskIndex];
      }
    }

    input.value = maskedValue;
  }
}
