import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-candidats',
  standalone: true,
  imports: [SideBarComponent],
  templateUrl: './candidats.component.html',
  styleUrl: './candidats.component.css'
})
export class CandidatsComponent {

}
