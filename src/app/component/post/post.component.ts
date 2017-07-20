import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-post',
  template: `<p>{{post}}</p>`,
})
export class PostComponent implements OnInit {
  @Input() post:string;
  constructor() { }


  ngOnInit() {
  }

}
