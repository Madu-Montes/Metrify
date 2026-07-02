import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PageTitleService } from '../../../core/services/page-title.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  title = '';

  private pageTitleService = inject(PageTitleService);


  ngOnInit(){

    this.pageTitleService.title$
      .subscribe(title => {

        this.title = title;

      });

  }
}
