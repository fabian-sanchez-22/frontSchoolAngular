import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadFormComponent } from './especialidad-form.component';

describe('EspecialidadFormComponent', () => {
  let component: EspecialidadFormComponent;
  let fixture: ComponentFixture<EspecialidadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialidadFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
