import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

// Define Movie interface
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

// Define MovieDetails interface
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
  movies$ = this.moviesSubject.asObservable(); // Allows components to subscribe

  // Set movies from search results
  setMovies(movies: Movie[]) {
    this.moviesSubject.next(movies);
  }

  // Get popular movies
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

  // Search movies
  searchMovies(query: string) {
    return this.http.get<{ results: Movie[] }>(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`
    );
  }

  // Get movie details
  getMovieDetails(id: number) {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`;
    console.log('API URL:', url);
    return this.http.get<MovieDetails>(url);
  }
}
