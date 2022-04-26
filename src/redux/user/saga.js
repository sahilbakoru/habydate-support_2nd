import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { signInWithGoogle } from '../../services/FirebaseServices';
import actions from './actions';

export async function* login() {
	yield takeEvery(actions.USER_LOGIN, function* ({ payload }) {
		const user = yield call(signInWithGoogle);
		yield put(actions.userLoinSuccess(user));
	});
}

export default function* rootSaga() {
	yield all([fork(login)]);
}
