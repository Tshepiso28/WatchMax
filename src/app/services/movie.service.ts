import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: { id: number; name: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private apiKey = environment.tmdbApiKey;
  private baseUrl = 'https://api.themoviedb.org/3';

  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  movies$ = this.moviesSubject.asObservable(); 

  setMovies(movies: Movie[]) {
    this.moviesSubject.next(movies);
  }

  loadPopularMovies() {
    this.http.get<{ results: Movie[] }>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`
    ).subscribe({
      next: (response) => this.setMovies(response.results),
      error: (err) => {
        console.error('Error loading popular movies:', err);
        this.setMovies([]);
      }
    });
  }

  searchMovies(query: string) {
    return this.http.get<{ results: Movie[] }>(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`
    );
  }

  getMovieDetails(id: number) {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`;
    console.log('API URL:', url);
    return this.http.get<MovieDetails>(url);
  }
}
