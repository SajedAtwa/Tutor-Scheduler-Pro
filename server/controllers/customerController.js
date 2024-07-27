const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/database'); 

// A function to register a new customer
exports.registerCustomer = async (req, res) => {
    const { first_name, last_name, email, password, phone_number } = req.body;
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const query = "INSERT INTO customer (first_name, last_name, email, password, phone_number) VALUES (?, ?, ?, ?, ?)";
        const values = [first_name, last_name, email, hashedPassword, phone_number];

        // Execute the command to save the customer
        await db.query(query, values);
        res.status(201).json({ message: "Customer registered successfully" });
    } catch (error) {
        console.error('Error registering customer: ', error);
        res.status(500).json({ message: "Server error while registering", error });
    }
};

// A function to help a customer log in
exports.loginCustomer = async (req, res) => {
  // Get the email and password the customer typed in
  const { email, password } = req.body;

  // Check if both email and password were provided
  if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password." });
  }

  try {
      // Prepare to look up the customer by their email
      const sql = 'SELECT * FROM customer WHERE email = ?';
      // Run the search in the database
      const [customers] = await db.execute(sql, [email]);

      // Check if we found a customer
      if (customers.length === 0) {
          return res.status(401).json({ message: 'Invalid credentials, no such customer found.' });
      }

      // Get the customer's details from the results
      const customer = customers[0];

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials, password does not match.' });
      }

      // Prepare a special access pass (JWT token) if the login is successful
      const payload = { customer: { id: customer.id, role: "customer" } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' },
          (err, token) => {
              if (err) throw err;
              // Send back the token and some details about the customer
              res.json({
                  token,
                  customer: { id: customer.id, name: customer.first_name + ' ' + customer.last_name, email: customer.email }
              });
          }
      );
  } catch (err) {
      // If there was a problem, tell the user there was a server error
      console.error(err.message);
      res.status(500).json({ message: 'Server error during the login process.' });
  }
};

// exports.getClassOptions = async (req, res) => {
//   // Get the service type from the user's request
//   const { serviceType } = req.query;

//   try {
//       // Prepare a SQL command to get all classes that match the service type
//       const query = "SELECT * FROM class WHERE service_type = ?";
//       const params = [serviceType];

//       // Execute the database query
//       db.query(query, params, (err, classes) => {
//           if (err) {
//               // If there is a problem with the database, tell the user
//               return res.status(500).json({ message: "Database error", error: err });
//           }

//           if (classes.length === 0) {
//               // If no classes are found, tell the user
//               return res.status(404).json({ message: "No classes found for the selected service type." });
//           }

//           // Prepare the data about the classes to send back to the user
//           const classOptions = classes.map(cls => ({
//               id: cls.id,
//               name: cls.name,
//               providerId: cls.provider_id,
//               startTime: cls.start_time,
//               endTime: cls.end_time,
//               cost: cls.cost 
//           }));

//           // Send the class data back to the user
//           res.json({
//               message: "Classes retrieved successfully",
//               classes: classOptions
//           });
//       });
//   } catch (error) {
//       // If something goes wrong, tell the user there was a server error
//       res.status(500).json({ message: "Server error while fetching classes", error });
//   }
// };

exports.getClassOptions = async (req, res) => {
      const { serviceType } = req.params;
  
    try {
      console.log('Service Type:', serviceType);
  
      // Query to select distinct class types, names, start times, and end times from the service and class tables
      const query = `
        SELECT s.class_type, c.name, c.start_time, c.end_time, c.cost, c.id
        FROM service s
        JOIN class c ON s.id = c.service_id
        WHERE LOWER(s.service_type) = LOWER(?)
          AND c.start_time >= NOW()
        ORDER BY s.class_type, c.start_time
      `;
  
      // Execute the query
      const [results] = await db.query(query, [serviceType]);
  
      console.log('Results:', results);
      console.log('Number of results:', results.length);
  
      // If no results found, return 404
      if (results.length === 0) {
        return res.status(404).send('No class types and sessions found for the selected service type.');
      }
  
      // Group the results by class type
      const classOptions = {};
      results.forEach(result => {
        const { class_type, name, start_time, end_time, cost, id} = result;
        if (!classOptions[class_type]) {
          classOptions[class_type] = [];
        }
        classOptions[class_type].push({ name, startTime: start_time, endTime: end_time, cost, id});
      });
  
      // Send the response
      res.json({
        message: "Class types and sessions retrieved successfully",
        data: classOptions
      });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error processing your request');
    }
  };

exports.getSessionOptions = async (req, res) => {
  // Get the class type from the user's request
  const { classType } = req.params;

  try {
    console.log('Service Type:', classType);
     // Query to select distinct start times from the class table where class type matches (case-insensitive)
      const sessionQuery = `
          SELECT DISTINCT start_time 
          FROM class c
          JOIN service s ON c.service_id = s.id
          WHERE LOWER(s.class_type) = LOWER(?)
          AND start_time >= NOW() 
          ORDER BY start_time
      `;

      // Execute the query
      const [sessions] = await db.query(sessionQuery, [classType]);
      console.log('Sessions: ', sessions)

      // If no sessions found, return 404
      if (sessions.length === 0) {
          return res.status(404).json({
              message: "No available sessions found for the selected class type."
          });
      }

      // Prepare the session times to send back to the user
      const sessionOptions = sessions.map(session => ({
          startTime: session.start_time
      }));

      // Send the session data back to the user
      res.json({
          message: "Available sessions retrieved successfully",
          sessions: sessionOptions
      });
  } catch (error) {
      // If something goes wrong, tell the user there was a server error
      res.status(500).json({
          message: "Server error while fetching sessions",
          error: error.message
      });
  }
};


// A function to process payment and book a class
exports.processPayment = async (req, res) => {

  // We get all the necessary information from the user's input
  const { 
      class_id, 
      creditCardNumber, cvc, expirationDate, cardholderFirstName, cardholderLastName,
      addressOne, addressTwo, city, state, zipcode
  } = req.body;

  const customerId = req.user.customer.id; // Simplified assumption that this is always present

  console.log('customer ID:', customerId);
  if (!customerId) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: No provider information found.'
    });
  }
  if (
    !class_id || !creditCardNumber || !cvc || !expirationDate ||
    !cardholderFirstName || !cardholderLastName || !addressOne || !city || !state || !zipcode
  ) 
  {
    return res.status(400).json({
      success: false,
      message: 'Bad request: Missing required parameters.'
    });
  }


  try {
      // First, we save the address information in the database
      const addressSql = 'INSERT INTO address (address_one, address_two, city, state, zipcode) VALUES (?, ?, ?, ?, ?)';
      const addressParams = [addressOne, addressTwo, city, state, zipcode];
      const [addressResult] = await db.execute(addressSql, addressParams);
      const addressId = addressResult.insertId;

      // Next, we save the payment information using the address ID we just created
      const paymentSql = 'INSERT INTO payment_info (address_id, credit_card_number, cvc, expiration_date, cardholder_first_name, cardholder_last_name) VALUES (?, ?, ?, ?, ?, ?)';
      const paymentParams = [addressId, creditCardNumber, cvc, expirationDate, cardholderFirstName, cardholderLastName];
      const [paymentResult] = await db.execute(paymentSql, paymentParams);
      const paymentInfoId = paymentResult.insertId;

      // Then, we record the booking details in the booking table
      const bookingSql = 'INSERT INTO booking (customer_id, class_id, payment_info_id) VALUES (?, ?, ?)';
      const bookingParams = [customerId, class_id, paymentInfoId];
      const bookingResult = await db.execute(bookingSql, bookingParams);

      // Finally, we tell the user everything was successful
      res.json({
          message: "Payment and booking processed successfully",
          addressId: addressId,
          paymentInfoId: paymentInfoId,
          bookingId: bookingResult.insertId  // Assuming you want to return the booking ID
      });
  } catch (error) {
      // If something goes wrong, tell the user there was a server error
      console.error('Database error:', error);
      res.status(500).json({ message: 'Server error during the payment and booking process', error });
  }
};

  