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
          this.movieService.setMovies(response.results); 
        },
        error: (err) => {
          console.error('Search error:', err);
          this.movieService.setMovies([]); 
        }
      });
    } else {
      this.movieService.loadPopularMovies(); 
    }
  }
  goHome() {
    this.router.navigate(['/']); 
    this.movieService.loadPopularMovies(); 
  }
}
