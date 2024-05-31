const firebase = require('firebase/app');
const { getDatabase, ref, query, orderByKey, limitToLast, get } = require('firebase/database');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const firebaseConfig = {
  apiKey: "AIzaSyDC1h57a0NiWMT9AXHwKCjj0nuxFvTpGQI",
  authDomain: "nzfl-testing-2.firebaseapp.com",
  databaseURL: "https://nzfl-testing-2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nzfl-testing-2",
  storageBucket: "nzfl-testing-2.appspot.com",
  messagingSenderId: "49651777220",
  appId: "1:49651777220:web:5376fb01c2aeb790231391"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

const device_no = "device_01";

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

app.get('/', (req, res) => {
  res.send('Hello from our server!');
});

app.get('/getLatestDSet', async (req, res) => {
  try {
    const datasetRef = ref(db, device_no);
    const latestQuery = query(datasetRef, orderByKey(), limitToLast(1));

    const snapshot = await get(latestQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const latestKey = Object.keys(data)[0];
      const latestData = data[latestKey];
      console.log(latestData);
      res.send(latestData);
    } else {
      res.status(404).send('No data found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
});


app.get('/getDSet', (req, res) => {
  

  const dataset_Ref = realtimeDatabase.ref(db, 'device_01/1709882515');
  realtimeDatabase.onValue(dataset_Ref, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    res.send(data);
  })
  // Create a query to order the data by key (assuming timestamps are used as keys)
});
