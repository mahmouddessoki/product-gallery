import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDarkMode!: boolean;
  private readonly id = inject(PLATFORM_ID)
  ngOnInit(): void {
    this.modeAfterReload()
    if (isPlatformBrowser(this.id)) {

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this.systemMode)
    }

  }


  systemMode() {
    if (isPlatformBrowser(this.id)) {
      const mode = localStorage.getItem('mode')
      if (mode) {
        this.modeAfterReload()
      } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add('dark')
          this.isDarkMode = true;
        } else {
          document.documentElement.classList.remove('dark')
          this.isDarkMode = false;
        }
      }
    }
  }







  modeAfterReload() {
    if (isPlatformBrowser(this.id)) {
      const mode = localStorage.getItem('mode')
      if (mode === 'dark') {
        document.documentElement.classList.toggle('dark')
        this.isDarkMode = true
      }
    }
  }

  changeMode() {
    if (isPlatformBrowser(this.id)) {
      const m = document.documentElement.classList.toggle('dark')

      if (m) {
        this.isDarkMode = true;
        localStorage.setItem('mode', 'dark');
      } else {
        this.isDarkMode = false;
        localStorage.setItem('mode', 'light');
      }
    }
  }
}
