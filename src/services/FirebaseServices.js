import { initFirebase } from './initFirebaseService';
import 'firebase/storage'
import moment from 'moment';
const firebase = initFirebase();
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage()

export const conversationsCollection = db.collection('Conversations');
export const promoCode = db.collection('promo_code');
export const redeem = db.collection('redeem');
export const Plans = db.collection("Plans");



export async function signInWithGoogle() {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.NONE)
            .then(() => {
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().useDeviceLanguage();
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(async function (result) {
                            var user = result.user;
                            console.log ("user", user)
                            const res = await checkUniqueUserOrCreate(user);
                            if (res.error === false) {
                                resolve(res);
                            } else {
                                resolve(res);
                            }
                    })
                    .catch(function (error) {
                        const res = {
                            error: true,
                            data: [],
                            msg: "Something went wrong"
                        }
                        reject(res)
                    });
            });
    });
}

export const updateUser = (res) => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((currentUser) => {
            db.collection('Users')
                .doc(res.uid)
                .set({ ...res })
                .then(() => {

                    return resolve({
                        error: false,
                        user: res,
                        msg: 'user updated successfully',
                    });

                })
                .catch((error) => {
                    localStorage.removeItem('user');
                    return reject({ error: true });
                });
        });
    });
};

export const checkUniqueUserOrCreate = async (user) => {
    return new Promise((resolve, reject) => {
        // const providerData = user.providerData[0];
       
        db.collection('Users')
            .where('isallow' ,'==', '12345')
            .get()
            .then((response) => {
                console.log("user2", user.isallow)
                const documents = response.docs.map((doc) => doc.data());
                if (documents.length > 0) {
                    return resolve({
                        error: false,
                        user: documents,
                        msg: 'Login successful',
                    });
                } else {
                    return resolve({
                        error: true,
                        user: user,
                        msg: 'No user founded Please register on App',
                    });
                }
            })
            
            .catch((error) => {
                return reject({ error: true });
            });
    });
};

function getUserMatch(data) {
    return new Promise((resolve, reject) => {
        db.collection('Matches')
            .where(data.key, '==', data.value)
            .get()
            .then((response) => {
                const documents = response.docs.map((doc) => doc.data());
                resolve(documents);
            })
            .catch(error => {
                reject(error)
            });
    });
}

export function getAllMatchesLists(uid) {
    return new Promise((resolve, reject) => {
        let add = [];
        add.push(getUserMatch({ key: 'uid', value: uid }));
        add.push(getUserMatch({ key: 'other_uid', value: uid }));

        Promise.all(add).then((response) => {
            let getUserInfo = [];
            for (let a in response) {
                let data = response[a];
                for (let v in data) {
                    let snapData = data[v];
                    let getUID = snapData.uid === uid ? snapData.other_uid : snapData.uid;
                    getUserInfo.push(getUserDetail(getUID, snapData));
                }
            }

            Promise.all(getUserInfo).then((responseData) => {
                let response = [];
                for (let v in responseData) {
                    let user = responseData[v].documents;
                    let data = responseData[v].data;
                    response.push({
                        user: user[0],
                        data
                    });
                }

                resolve(response);
            });
        });
    });
}

export function getUserDetail(uid, data) {
    return new Promise((resolve, reject) => {
        db.collection('Users')
            .where('uid', '==', uid)
            .get()
            .then((response) => {
                const documents = response.docs.map((doc) => doc.data());
                return resolve({ documents, data });
            })
            .catch((error) => {
                return reject(error);
            });
    });
}

export function uploadUserImage(file, uid) {
    return new Promise((resolve, reject) => {
        const ref = storage.ref(`/${uid}/${file.name}`);
        const uploadTask = ref.put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            ref
                .getDownloadURL()
                .then((url) => {
                    resolve(url)
                });
        });
    })
}


//********* this function put audio in storage **********
export function uploadUserVoice(file, uid) {
    console.log(file,"file....")
    return new Promise((resolve, reject) => {
        const ref = storage.ref(`/${uid}/${file}hh`);
    console.log(ref,"ref....")
        const uploadTask = ref.put(file);
        console.log(file,"file2....")
        uploadTask.on("state_changed", console.log, console.error, () => {
            ref
                .getDownloadURL()
                .then((url) => {
                    resolve(url)
                });
        });
    })
}


export function createNewConversation(id, members) {
    return new Promise((resolve, reject) => {
        db.collection('Conversations')
            .doc(id)
            .set({
                matches_id: id,
                members,
                latestMessage: {
                    text: ``,
                    createdAt: moment().utc().unix(),
                },
            })
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                reject(false);
            });
    });
}

export function getAllConversationLists(uid) {
    return new Promise((resolve, reject) => {
        getAllMatchesLists(uid, false).then((response) => {
            if (response.length > 0) {
                let getConversations = response.map(function (o) {
                    return o.data.customId;
                });
                db.collection('Conversations')
                    .where('matches_id', 'in', getConversations)
                    .get()
                    .then((snapshot) => {
                        if (Boolean(snapshot)) {
                            let docs = snapshot.docs;
                            let conversations = [];
                            let conversationUnreadCount = 0;
                            for (let v in docs) {
                                let data = {
                                    ...docs[v].data(),
                                };
                                let obj = response.find((o) => o.data.customId === data.matches_id);
                                data.user = obj.user;
                                let latestMessage = data.latestMessage;
                                if (latestMessage) {
                                    const { createdAt } = latestMessage;
                                    let checkRead = Boolean(data[uid])
                                        ? data[uid] < createdAt
                                        : true;
                                    if (checkRead) {
                                        conversationUnreadCount += 1;
                                    }

                                    conversations.push(data);
                                }

                            }
                            resolve({ data: conversations, count: conversationUnreadCount });
                        }
                    });
            }
        });
    });
}

export function updateLatestMessageInConversation(id, data) {
    console.log("..............data", data, id)
    return new Promise((resolve, reject) => {
        let parameter = {};
        let createdAt = moment().utc().unix();
        data = { ...data, user: { _id: createdAt } }
        // parameter[data.user._id] = ;
        parameter['latestMessage'] = {
            ...data,
            createdAt,
        };
        console.log("............parameter???????????", parameter);
        db.collection('Conversations')
            .doc(id)
            .set(parameter, { merge: true })
            .then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            });
    });
}

export function readMessageInConversation(id, uid) {
    return new Promise((resolve, reject) => {
        let parameter = {};
        parameter[uid] = moment().utc().unix();
        db.collection('Conversations')
            .doc(id)
            .set(parameter, { merge: true })
            .then((response) => { });
    });
}

export function addMessageInConversation(id, parameter) {

    console.log(".............id??????????????", id)
    return new Promise((resolve, reject) => {
        db.collection('Conversations')
            .doc(id)
            .collection('Messages')
            .add({
                ...parameter,
                createdAt: moment().utc().unix(),
            })
            .then((response) => {
                resolve(true);
            });
    });
}

export function getAllMatchMessages(id) {
    return new Promise((resolve, reject) => {
        conversationsCollection
            .doc(id)
            .collection('Messages')
            .orderBy('createdAt', 'asc')
            .onSnapshot((response) => {
                const documents = response.docs.map((doc) => doc.data());
                return resolve({ error: false, msg: "Chat details", data: documents });
            })
    })
}

export function getAllPlans() {
    return new Promise((resolve, reject) => {
        db.collection('Plans')
            .doc("Months")
            .onSnapshot((response) => {
                const monthData = response.data();
                db.collection('Plans')
                    .doc("Years")
                    .onSnapshot((res) => {
                        const yearsData = res.data();
                        const finalData = { monthData, yearsData };
                        resolve(finalData);
                    });
            });
    });
}

export function getAllPromoCode(id) {
    return new Promise((resolve, reject) => {
        promoCode
            .get()
            .then((response) => {
                const documents = response.docs.map((doc) => doc.data());
                return resolve({ error: false, msg: "All promos details", data: documents });
            })
            .catch(error => {
                return reject({ error: true, msg: "All Redeem codes", data: [] })
            });
    })
}

export function getAllRedeemCode(id) {
    return new Promise((resolve, reject) => {
        redeem
            .where("user_id", '==', id)
            .get()
            .then((response) => {
                const documents = response.docs.map((doc) => doc.data());
                return resolve({ error: false, msg: "All redeem codes", data: documents });
            })
            .catch(error => {
                return reject({ error: true, msg: "All Redeem codes", data: [] })
            });
    })
}

export function addToRedeemCoupon(payload) {
    return new Promise((resolve, reject) => {
        redeem
            .doc()
            .set({ ...payload })
            .then(() => {
                return resolve({
                    error: false,
                    msg: 'Coupon redeemed successfully',
                });

            })
            .catch((error) => {
                return reject({ error: true });
            });
    })
}

export function getAllReportedUser(id) {
    return new Promise((resolve, reject) => {
        db.collection('report')
            .where("user_id", '==', id)
            .get()
            .then((response) => {
                const documents = response.docs.map((doc) => doc.data());
                return resolve({ error: false, msg: "All reported users", data: documents });
            })
            .catch(error => {
                return reject({ error: true, msg: "something went wrong", data: [] })
            });
    });
}

export function addToReport(payload) {
    return new Promise((resolve, reject) => {
        db.collection('report')
            .doc()
            .set({ ...payload })
            .then(() => {
                return resolve({
                    error: false,
                    msg: 'Coupon redeemed successfully',
                });

            })
            .catch((error) => {
                return reject({ error: true });
            });
    })
}

export function getBlockedUser(uid) {
    return new Promise((resolve, reject) => {
        db.collection('block_users')
            .where("to_user_id", '==', uid)
            .get()
            .then((blocked) => {
                db.collection('block_users')
                    .where("user_id", '==', uid)
                    .get()
                    .then((blockedByYou) => {
                        const res1 = blocked.docs.map((doc) => doc.data());
                        const res2 = blockedByYou.docs.map((doc) => doc.data());
                        const data = {
                            blockedUser: res1,
                            blockedByYou: res2,
                            init: true
                        }
                        resolve({ error: false, data });
                    })
                    .catch(error => {
                        reject({ error: true, data: null })
                    });
            })
            .catch(error => {
                reject({ error: true, data: null })
            });
    });
}

export function addToBlocked(payload) {
    return new Promise((resolve, reject) => {
        db.collection('block_users')
            .doc()
            .set({ ...payload })
            .then(() => {
                return resolve({
                    error: false,
                    msg: 'User Blocked successfully',
                });

            })
            .catch((error) => {
                return reject({ error: true });
            });
    })
}

export function unblockUser(params) {
    return new Promise((resolve, reject) => {
        db.collection('block_users')
            .where("to_user_id", "==", params.toId).where("user_id", "==", params.uid)
            .get()
            .then((res) => {
                // const res1 = res.docs.map((doc) => doc.data());
                res.forEach(item => {
                    db.collection('block_users').doc(item.id).delete().then(resu => {
                        return resolve({ error: false, data: [] })
                    })
                })

            })
            .catch((error) => {
                return reject({ error: true });
            });
    })
}