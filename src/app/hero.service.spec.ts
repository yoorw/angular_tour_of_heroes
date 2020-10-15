import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';

describe('HeroService', () => {
  const mockHeroes: Hero[] = [
    {id: 1, name: 'test1'},
    {id: 2, name: 'test2'},
    {id: 3, name: 'test3'}
  ];
  
  let service: HeroService;
  const mockMessageService = new MessageService();

  let http = {
    get: jest.fn(() => of(mockHeroes))
  };

  beforeEach(() => {
    // const messageService = new MessageService();
    // messageService = jest.fn();
    // messageService = jest.fn();
    service = new HeroService(http as any, mockMessageService);
  })



  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(HeroService);
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes: should return a list of heroes', () => {
    service.getHeroes().subscribe(heroes => {
      expect(http.get).toHaveBeenCalledWith('api/heroes');
      expect(heroes.length).toBe(3);
      expect(heroes[2].name).toBe('test3');
    });
  });
});
