import { Component, OnInit } from '@angular/core';
import { MovieService, MovieDetails } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common'; 

@Component({
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie?: MovieDetails;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const movieId = this.route.snapshot.params['id'];
    console.log('Movie ID:', movieId); 
    if (isNaN(movieId)) {
      this.errorMessage = 'Invalid movie ID';
      this.isLoading = false;
      return;
    }
  
    
    this.movieService.getMovieDetails(movieId).subscribe({
      next: (response) => {
        console.log('Movie details:', response);
        this.movie = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
        this.errorMessage = 'Failed to load movie details';
        this.isLoading = false;
      }
    });
  }
}

