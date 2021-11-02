import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  frType;
  age;

  myVar() {
    if ((this.age > 17 && (this.frType == "Infant"))
      || (this.age > 40 && this.frType == "Grandchild")
      || (this.age <= 5 &&
        (this.frType != "Child"
          || this.frType != "Infant"
          || this.frType != "Grandchild" || this.frType != "Cousin"))){

          }
  }
}
