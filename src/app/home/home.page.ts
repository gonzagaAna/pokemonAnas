import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-home',
  imports: [CommonModule, IonicModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemonList: any[] = [];


  constructor(public pokemonService: PokemonService) {
    this.loadPokemon();

  }

  loadPokemon(){
    this.pokemonService.getPokemonList().subscribe((data:any) => {
      this.pokemonList = data.results;

    });
  }

}
