import { Component, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { PageTitleService } from '../../core/services/page-title.service';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    Sidebar,
    Header
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})

export class MainLayout {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private pageTitleService = inject(PageTitleService);

  constructor(){

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {

        let route = this.activatedRoute;

        while(route.firstChild){

          route = route.firstChild;
        }

        const title = route.snapshot.data['title'];

        if(title){
          this.pageTitleService.setTitle(title);
        }

      });

  }

}
