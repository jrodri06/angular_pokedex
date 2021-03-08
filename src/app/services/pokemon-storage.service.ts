import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinct, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class PokemonStorage {

    constructor() { }

    pokemonList: object[] = [];
    fecthesMade: number = 0;
    cache = [];
    totalPokemonsRendered = new BehaviorSubject(0);


    setPokemonList(list) {
        this.pokemonList = [...this.pokemonList, list];
    }

    getPokemonList() {
        return this.pokemonList;
    }

    setFetchesMade(page) {
        this.fecthesMade = page;
    }

    getFetchesMade() {
        return this.fecthesMade;
    }


    scrollPosition: number = 0;

    setLastPokemonClicked(position) {
        this.scrollPosition = position;
    }

    viewLastPokemonClicked() {
        return this.scrollPosition;
    }

    pokemonRendered() {
        this.totalPokemonsRendered.next(this.totalPokemonsRendered.getValue() + 1);
    }

    resetPokemonRendered() {
        this.totalPokemonsRendered.next(0);
    }
}
