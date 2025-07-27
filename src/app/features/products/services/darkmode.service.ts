import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {
  private platform = inject(PLATFORM_ID)
  private document = inject(Document)
  isDark = signal<boolean>(false);

  constructor() {
    this.initializeTheme()
   }

    private initializeTheme(): void {
    if (!isPlatformBrowser(this.platform)) return;

    const savedMode = localStorage.getItem("isDark");
    if (savedMode !== null) {
      this.isDark.set(savedMode === "true");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.isDark.set(prefersDark);
    }
    this.applyTheme(this.isDark());
  }

  saveCurrentMode(){
    if(isPlatformBrowser(this.platform)) {
      localStorage.setItem("isDark",JSON.stringify(this.isDark()))
    }
  }

   private applyTheme(isDark: boolean): void {
    if (!isPlatformBrowser(this.platform)) return;
    const html = this.document.documentElement;
    if (isDark) {
      html.classList.add("dark-mode");
    } else {
      html.classList.remove("dark-mode");
    }
  }
}
