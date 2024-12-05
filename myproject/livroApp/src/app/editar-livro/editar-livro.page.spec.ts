import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarLivroPage } from './editar-livro.page';

describe('EditarLivroPage', () => {
  let component: EditarLivroPage;
  let fixture: ComponentFixture<EditarLivroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLivroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
