import { all } from 'redux-saga/effects';
import userSagas from './user/saga';
import matchesSagas from './matches/saga';

export default function* rootSaga() {
	yield all([userSagas(), matchesSagas()]);
}
