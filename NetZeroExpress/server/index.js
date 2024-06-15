const firebase = require('firebase/app');
const { getDatabase, ref, query, orderByKey, limitToLast, get } = require('firebase/database');
const express = require('express');
const cors = require('cors');
const { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();



app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost'], // Add your frontend URLs here
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

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

app.get('/getDSet', async (req, res) => {
  try {
    const datasetRef = ref(db, 'device_01/1709882515');
    const snapshot = await get(datasetRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);
      res.send(data);
    } else {
      res.status(404).send('No data found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
});

app.get('/createAccount', (req, res) => {
  const auth = getAuth(firebaseApp);
  createUserWithEmailAndPassword(auth, 'TestEmail@gmail.com', 'TestPassword')
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      res.send('Account created successfully');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
      res.status(500).send(`Error creating account: ${errorMessage}`);
    });
});

app.post('/login', async (req, res) => {
  console.log("Login request received");
  const { email, password } = req.body;
  const auth = getAuth(firebaseApp);

  console.log("Login Attempted");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);

    // Set cookies with the UID and email
    res.cookie('uid', user.uid, { httpOnly: false, secure: false }); // Set secure: true for production
    res.cookie('email', user.email, { httpOnly: false, secure: false });
    
    res.status(200).send({ message: 'Login successful', user });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error during login: ${errorMessage}`);

    if (!res.headersSent) {
      res.status(400).json({ errorCode, errorMessage });
    }
  }
});

app.get('/getDSetWeek', async (req, res) => {
  try {
    const datasetRef = ref(db, 'device_01/1709882515');
    const snapshot = await get(datasetRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);
      res.send(data);
    } else {
      res.status(404).send('No data found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
});
