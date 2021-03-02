import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

import { PokemonItemService } from '../../services/pokemon-item.service';

@Component({
  selector: 'app-pokemon-full-profile',
  templateUrl: './pokemon-full-profile.component.html',
  styleUrls: ['./pokemon-full-profile.component.sass']
})
export class PokemonFullProfileComponent implements OnInit {
  constructor( private route: ActivatedRoute, private dataHandler: PokemonItemService ){ }

  // Font Awesome Icon
  faChevronCircleLeft = faChevronCircleLeft;

  pokemonName: string;
  avatarImg: string;
  pokemonDesc: string;
  profileColor: string;

  pokemonTypes: string[];
  // Shape for Pokemon type
  typeIcon: string = 'tags';

  pokemonStats: object[];

  ngOnInit(): void {
    // Collect pokemon name from params
    this.route.params.subscribe(p => this.pokemonName = p['name']);

    // Get all data about pokemon
    this.dataHandler.pokemonData(this.pokemonName).subscribe((data: any) => {

      // Avatar img
      this.avatarImg = data.sprites.other.dream_world.front_default;

      // Description
      this.getDescription(data.id);

      // Types
      this.pokemonTypes = data.types.map(t => t.type.name);

      // Profile Colour
      this.profileColor = this.pokemonTypes[0];

      // Stats
      this.pokemonStats = data.stats;
    });
  };

  getDescription(id: number) {
    this.dataHandler.pokemonCharacteristics(id).subscribe((details: any) => details.flavor_text_entries.filter(
      (desc: {
        flavor_text: string,
        version: {
          name: string
        }
    }) => {
      if(desc.version.name === 'ruby') {
        // Edit the name to be only first letter capital
        const name = this.pokemonName.charAt(0).toUpperCase() + this.pokemonName.slice(1);
        const textEdited = desc.flavor_text.replace(desc.flavor_text.split(" ")[0], name);

        this.pokemonDesc = textEdited;
      } 
    }));
  };

}
