import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  pokemonList: any[] = [];

  constructor(
    public pokemonService: PokemonService,
    private router: Router
  ) {
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokemonService.getPokemonList().subscribe((data: any) => {
      this.pokemonList = data.results;
    });
  }

  openDetails(url: string) {
    const id = url.split('/')[6];
    this.router.navigate(['/pokemon-details', id]);
  }
}
