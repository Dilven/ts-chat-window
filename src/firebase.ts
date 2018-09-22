import * as firebase from 'firebase'
const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
};

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
})

export default db;