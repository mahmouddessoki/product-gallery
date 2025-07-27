import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fallback-ui',
  imports: [],
  templateUrl: './fallback-ui.component.html',
  styleUrl: './fallback-ui.component.css'
})
export class FallbackUIComponent {
  errorMsg = input.required<string>()
}
