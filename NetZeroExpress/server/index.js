const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { getDatabase, ref, query,orderByChild, orderByKey, limitToLast, get, startAt, endAt } = require('firebase/database');
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

// Start the server
app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello from our server!');
});

app.post('/getLatestDSet', async (req, res) => {
  try {
    const datasetRef = ref(dbSensors, "device_"+req.body.currentSensor);
    const latestQuery = query(datasetRef, orderByKey(), limitToLast(1));
    const snapshot = await get(latestQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const latestKey = Object.keys(data)[0];
      const latestData = data[latestKey];
      res.status(200).send(latestData);
    } else {
      res.status(404).send('No data found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
});

app.post('/getDSet', async (req, res) => {
  try {
    const datasetRef = ref(dbSensors, req.body.sensor+'/1709882515');
    const snapshot = await get(datasetRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
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

    // Set cookies with the UID and email
    res.cookie('uid', user.uid, { httpOnly: false, secure: false }); // Set secure: true for production
    res.cookie('email', user.email, { httpOnly: false, secure: false });
    
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
    const userId = req.body.idQuery;

    if (!userId) {
      return res.status(400).json({ error: 'idQuery is required' });
    }

    const datasetRef = ref(dbUsers, `Users/${userId}/Sensors`);
    const snapshot = await get(datasetRef);

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/getCredentials', async (req, res) => {
  try {
    const userQuery = req.body.userQuery;

    if (!userQuery) {
      return res.status(400).json({ error: 'idQuery is required' });
    }

    const datasetRef = ref(dbUsers, `Users/${userQuery}/Credentials`);

    const snapshot = await get(datasetRef);

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/getWeeksData', async (req,res) => {
  console.log('called')
  const now = new Date(); // Create a Date object to get current date and time
  

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const dayOfWeekIndex = now.getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[now.getDay()];
  const daysPassed = dayOfWeekIndex + 1;

  // Calculate total minutes since midnight

  console.log('hours ',{hours})
  const totalMinutes = parseInt(hours * 60) + parseInt(minutes);
  console.log(totalMinutes)
  
  // Calculate number of 10-minute intervals passed

  const intervalsPassed = Math.floor(totalMinutes / 10);



  console.log(dayOfWeek)

  try {
    const datasetRef = ref(dbSensors, 'device_01');
  
    // Get the start and end timestamps for the current day
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).getTime() - 1;
  
    // Query to get entries added today based on timestamp
    const todayQuery = query(
      datasetRef,
      orderByChild('timestamp'),
      startAt(startOfDay),
      endAt(endOfDay)
    );
  
    // Retrieve data
    const snapshot = await get(todayQuery);
  
    if (snapshot.exists()) {
      const data = snapshot.val();
      const dataArray = Object.values(data); // Convert object to array if needed
  
      // Process dataArray as needed
      res.status(200).send(dataArray);
    } else {
      res.status(404).send('No data found');
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data');
  }
  // Total number of entries to obtain:

  // to get data for current week:
  // days of week passed * 144 + intervals that have passed ( number of intervals this week )

  // and 11088 more intervals for past 11 weeks

  // const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // const timeSeriesData = {};

  // // Create entries from 1 to 12, each containing a sub-dictionary for days of the week
  // for (let i = 1; i <= 12; i++) {
  //   timeSeriesData[i] = {};
  //   daysOfWeek.forEach(day => {
  //     timeSeriesData[i][day] = {}; // Initialize each day with an empty object
  //   });
  // }

  // console.log(timeSeriesData);



  // // Format the time
  // const hours = String(now.getHours()).padStart(2, '0');
  // const minutes = String(now.getMinutes()).padStart(2, '0');
  // const seconds = String(now.getSeconds()).padStart(2, '0');

  // console.log(day)

  // const datasetRef = ref(dbUsers, `Users/${userQuery}/Credentials`);

  // const snapshot = await get(datasetRef);

  // try {
  //   const userQuery = req.body.userQuery;

  //   if (!userQuery) {
  //     return res.status(400).json({ error: 'idQuery is required' });
  //   }

  //   const datasetRef = ref(dbUsers, `Users/${userQuery}/Credentials`);

  //   const snapshot = await get(datasetRef);

  //   if (snapshot.exists()) {
  //     res.status(200).json(snapshot.val());
  //     console.log("Snapshot : ")
  //     console.log(snapshot.val())
  //   } else {
  //     res.status(404).json({ message: 'No data found' });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }

  // Step 1
  // Get today's day
  // Get Average of today's day
  
  // Get data for passed days in the week

  // Get data for past 5 weeks of data

})


