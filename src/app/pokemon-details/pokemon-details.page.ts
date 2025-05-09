import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,  // This component is standalone
  imports: [IonicModule, CommonModule],  // Importing necessary modules for this component
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {
  pokemon: any = null;
  errorMessage: string | null = null;  // To store error messages
  isLoading: boolean = true;  // Loading state

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemonDetailsById(id).subscribe({
        next: (data: any) => {
          this.pokemon = {
            name: data.name,
            height: data.height,
            weight: data.weight,
            types: data.types.map((t: any) => t.type.name).join(', '),
            image: data.sprites.front_default
          };
          this.isLoading = false;  // Stop loading when data is successfully fetched
        },
        error: (error) => {
          this.errorMessage = 'Falha ao carregar os detalhes do Pokémon.';  // Display error message
          console.error('Error fetching Pokemon details:', error);
          this.isLoading = false;  // Stop loading even if there's an error
        }
      });
    }
  }
}
