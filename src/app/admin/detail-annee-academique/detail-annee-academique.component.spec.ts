import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnneeAcademiqueComponent } from './detail-annee-academique.component';

describe('DetailAnneeAcademiqueComponent', () => {
  let component: DetailAnneeAcademiqueComponent;
  let fixture: ComponentFixture<DetailAnneeAcademiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAnneeAcademiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAnneeAcademiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
