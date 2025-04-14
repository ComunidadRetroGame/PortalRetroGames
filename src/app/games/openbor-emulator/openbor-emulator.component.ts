import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-openbor-emulator',
  templateUrl: './openbor-emulator.component.html',
  styleUrls: ['./openbor-emulator.component.scss'],
})
export class OpenborEmulatorComponent implements OnInit {
  gameFile: string = '';
  gameUrl: string = '';
  clicked: boolean = false;
  downloadRomLink: string = '';
  countdown: number = 20; // Tiempo en segundos
  showEmulator: boolean = false;

  isStartGame: boolean = false;
  loadGame: boolean = false;

  emulatorCore: string = 'openbor'; // Valor predeterminado

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    // Leer parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.gameFile = params['game'] || 'default.pak'; // Valor por defecto
      this.emulatorCore = params['emu'] || 'openbor'; // Leer el parámetro 'emu'

      // Construir la URL del juego
      this.gameUrl =this.gameFile;
      this.downloadRomLink = this.gameUrl;

      // Inicializar el emulador
      this.initializeEmulator();

      // Iniciar la cuenta regresiva
      this.startCountdown();
    });
  }

  private isExternalUrl(url: string): boolean {
    return /^(http|https):\/\/[^ "]+$/.test(url);
  }


  private startCountdown(): void {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.showEmulator = true;
      }
    }, 1000); // Actualizar cada segundo
  }
  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async initializeEmulator(): Promise<void> {
    console.log('Inicializando emulador...');

    // Esperar 4 segundos


    // Continuar con la inicialización del emulador
    (window as any).EJS_gameUrl = this.gameUrl;
    (window as any).EJS_core = this.emulatorCore;
    (window as any).EJS_player = '#game';
    (window as any).EJS_adUrl = '';
    (window as any).EJS_adBlocked = this.handleAdBlocked;
    (window as any).EJS_onGameStart = this.handleGameStart.bind(this);
    (window as any).EJS_ready = this.handleReady.bind(this);
    (window as any).EJS_AdTimer = 0;
    await this.wait(4000);
    console.log('EJS_gameUrl:', this.gameUrl); // Verifica que el valor de la URL del juego es el correcto
    console.log('Emulador inicializado después de 4 segundos.');
  }


  private handleReady(event: any): void {
    this.showEmulator = true;
    this.countdown = 0;
    console.log('Listo para jugar! Emulación preparada.', event);
  }

  private handleGameStart(event: any): void {
    this.showEmulator = true;

    this.countdown = 0;
    this.isStartGame = true;
    console.log('Juego iniciado.!!!!' + this.isStartGame, event);
    document.getElementById('overlay-content')!.querySelector('p')!.textContent = 'Preparando todo para Jugar';
    document.getElementById('overlay-content')!.querySelector('h2')!.textContent = '¿Estas listo?';
    setTimeout(() => document.getElementById('overlay')?.remove(), 16000);



  }

  private handleAdBlocked(): void {
    // Eliminar anuncios
    console.log('PRE!!! Anuncios bloqueados.');
    (window as any).EJS_adBlocked('', true);
    console.log('Anuncios bloqueados.');
  }

  private isAbsoluteUrl(url: string): boolean {
    // Verificar si es una URL absoluta
    const regex = /^(https?|ftp):\/\//i;
    return regex.test(url);
  }
}
