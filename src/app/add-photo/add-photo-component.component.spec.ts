import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPhotoComponent } from './add-photo-component.component';


describe('AddPhotoComponentComponent', () => {
  let component: AddPhotoComponent;
  let fixture: ComponentFixture<AddPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
