import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router'

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, FormsModule]
})
export class NavbarComponent {
  searchQuery = '';

  constructor(private movieService: MovieService, private router: Router) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.movieService.searchMovies(this.searchQuery.trim()).subscribe({
        next: (response) => {
          this.movieService.setMovies(response.results); // Store search results in service
        },
        error: (err) => {
          console.error('Search error:', err);
          this.movieService.setMovies([]); // Clear results if search fails
        }
      });
    } else {
      this.movieService.loadPopularMovies(); // Reload popular movies
    }
  }
  goHome() {
    this.router.navigate(['/']); // Navigate back to the movie list page
    this.movieService.loadPopularMovies(); // Reload popular movies
  }
}
