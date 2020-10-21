import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService without Angular testing support (aka TestBed)', () => {

});

describe('HeroService with Angular testing support (aka TestBed)', () => {
  let heroService: HeroService;
  let httpClientSpy: {get: jasmine.Spy};
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [
        HeroService,
        {provide: MessageService, useValue: spy},
      ]
    });
    
    // Inject both the service-to-test and its (spy) dependency
    heroService = TestBed.inject(HeroService);
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('#getHeroes should return stubbed value from a spy', () => {
    const stubValue = 'stub value';
    messageServiceSpy.add;

    expect(heroService.getHeroes()).toBe(stubValue, 'service returned stub value');
    expect(messageServiceSpy.add.calls.count()).toBe(1, 'spy method was called once');
    expect(messageServiceSpy.add.calls.mostRecent().returnValue).toBe(undefined);
  });

  it('getHeroes value should return real value from the real Hero Service', () => {
    heroService = new HeroService(httpClientSpy as any, new MessageService());
    expect(heroService.getHeroes()).toBe('real Value');
  });
});

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
