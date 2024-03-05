import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { CatsFromApi, Cat } from "../../interfaces/cats.interface";
import { CatsService } from "../../services/cats/cats.service";
import { of } from "rxjs";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let catsFromApi: CatsFromApi;
  let mockCatsService: jasmine.SpyObj<CatsService>;

  beforeEach(async () => {
    catsFromApi = {
      images: [
        {
          "url": "https://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg",
          "id": "MTgwODA3MA"
        },
        {
          "url": "https://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg",
          "id": "tt"
        },
        {
          "url": "https://25.media.tumblr.com/tumblr_m4bgd9OXmw1qioo2oo1_500.jpg",
          "id": "bmp"
        },
      ]
    }

    mockCatsService = jasmine.createSpyObj('catsService', ['getCats']);
    mockCatsService.getCats.and.returnValue(of(catsFromApi));

    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule, HttpClientModule],
      providers: [
        {
          provide: CatsService,
          useValue: mockCatsService,
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should twoRandomCats have 2 of length', () => {
    expect(component.twoRandomCats.length).toBe(2);
  });

  it('should getRandomCat return a cat', () => {
    const randomCat: Cat = component.getRandomCat();

    expect(randomCat).toBeDefined();
    expect(typeof randomCat.id).toBe('string');
    expect(typeof randomCat.url).toBe('string');
  });
});
