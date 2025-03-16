import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  title: string = "Welcome To WatchMax"
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.movies$.subscribe(movies => {
      this.movies = movies;
    });

    this.movieService.loadPopularMovies();
  }
}
