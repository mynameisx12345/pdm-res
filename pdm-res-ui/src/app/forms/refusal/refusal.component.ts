import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-refusal',
  templateUrl: './refusal.component.html',
  styleUrls: ['./refusal.component.sass']
})
export class RefusalComponent implements OnInit {
  id = null;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParams.pipe(
      tap((params)=>{
        if(params.hasOwnProperty('id')){
          this.id = params['id'];
        }
      }),
      take(1),
    ).subscribe();
  }

  printPreview(){
    this.router.navigateByUrl(`forms/refusal-print?id=${this.id}`);
  }
}
