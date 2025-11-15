import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTurnosComponent } from './panel-turnos.component';

describe('PanelTurnosComponent', () => {
  let component: PanelTurnosComponent;
  let fixture: ComponentFixture<PanelTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelTurnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
