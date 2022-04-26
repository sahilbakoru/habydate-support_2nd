import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { getAllMatchesLists } from '../../services/FirebaseServices';
import actions from './actions';

export async function* getAllMatches() {
	console.log('................saga............2');
	yield takeEvery(actions.GET_ALL_MATCHES, function* ({ payload }) {
		console.log('................saga............2', payload);
		const list = yield call(getAllMatchesLists(payload.user));
		console.log('................saga............2', list);
		yield put(actions.getAllMatchesListsSuccess(list));
	});
}

export default function* rootSaga() {
	yield all([fork(getAllMatches)]);
}
