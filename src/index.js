import CommentsModel from './model/comments-model';
import FilmsModel from './model/films-model';
import AppPresenter from './presenter/app-presenter';
import CommentsApiService from './service/comments-api-service';
import FilmsApiService from './service/films-api-service';

const AUTHORIZATION = 'Basic hS2adS44poi1qr2j';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict/';

const commentsModel = new CommentsModel({
  commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION)
});
const filmsModel = new FilmsModel({
  filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)
});

const appPresenter = new AppPresenter({
  filmsModel,
  commentsModel
});

appPresenter.init();
filmsModel.init();
