const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { getDatabase, ref, query, orderByKey, limitToLast, get } = require('firebase/database');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// CORS options
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost'], // Add your frontend URLs here
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// Firebase configuration for User Data
const firebaseConfigUsers = {
  apiKey: "AIzaSyDC1h57a0NiWMT9AXHwKCjj0nuxFvTpGQI",
  authDomain: "nzfl-testing-2.firebaseapp.com",
  databaseURL: "https://nzfl-testing-2-users.firebaseio.com/",
  projectId: "nzfl-testing-2",
  storageBucket: "nzfl-testing-2.appspot.com",
  messagingSenderId: "49651777220",
  appId: "1:49651777220:web:5376fb01c2aeb790231391"
};

// Firebase configuration for Sensor Data
const firebaseConfigSensors = {
  apiKey: "AIzaSyDC1h57a0NiWMT9AXHwKCjj0nuxFvTpGQI",
  authDomain: "nzfl-testing-2.firebaseapp.com",
  databaseURL: "https://nzfl-testing-2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nzfl-testing-2",
  storageBucket: "nzfl-testing-2.appspot.com",
  messagingSenderId: "49651777220",
  appId: "1:49651777220:web:5376fb01c2aeb790231391"
};

// Initialize Firebase for User Data
const firebaseAppUsers = initializeApp(firebaseConfigUsers, 'firebaseAppUsers');
const dbUsers = getDatabase(firebaseAppUsers);

// Initialize Firebase for Sensor Data
const firebaseAppSensors = initializeApp(firebaseConfigSensors, 'firebaseAppSensors');
const dbSensors = getDatabase(firebaseAppSensors);

// Authentication
const auth = getAuth(firebaseAppUsers);

const device_no = "device_01";

// Start the server
app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello from our server!');
});

app.get('/getLatestDSet', async (req, res) => {
  try {
    const datasetRef = ref(dbSensors, device_no);
    const latestQuery = query(datasetRef, orderByKey(), limitToLast(1));
    const snapshot = await get(latestQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const latestKey = Object.keys(data)[0];
      const latestData = data[latestKey];
      console.log(latestData);
      res.status(200).send(latestData);
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
    const datasetRef = ref(dbSensors, 'device_01/1709882515');
    const snapshot = await get(datasetRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);
      res.status(200).send(data);
    } else {
      res.status(404).send('No data found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
});

app.post('/createAccount', (req, res) => {
  const { email, password } = req.body;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      res.status(200).send('Account created successfully');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
      res.status(500).send(`Error creating account: ${errorMessage}`);
    });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);

    // Set cookies with the UID and email
    res.cookie('uid', user.uid, { httpOnly: true, secure: false }); // Set secure: true for production
    res.cookie('email', user.email, { httpOnly: true, secure: false });
    
    res.status(200).send({ message: 'Login successful', user });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error during login: ${errorMessage}`);
    res.status(400).json({ errorCode, errorMessage });
  }
});

app.post('/getSensors', async (req, res) => {
  try {
    console.log("Called")
    const datasetRef = ref(dbUsers, 'Users/' + req.body.idQuery);
    const snapshot = await get(datasetRef);

    if (snapshot.exists()) {
      console.log(snapshot.val());
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
