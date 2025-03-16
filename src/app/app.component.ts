import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
@Component({
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MovieDetailsComponent, MovieListComponent, NavbarComponent],
  selector: 'app-root',
  templateUrl:'app.component.html'
})
export class AppComponent {
  constructor(private router: Router) {

  ;
  }
}