import { Component, Input } from '@angular/core';

@Component({
  selector: 'nav',
  template: `<div class="row"><div class="NavBox">Home</div><div class="NavBox">Projects</div></div>`,
  styles: [`.NavBox{font-weight:bold; font-family:Arial;}`]
})
export class NavComponent  {
  @Input() name: string;
}
