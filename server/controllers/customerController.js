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
                customer: {
                  id: customer.id,
                  name: customer.first_name + ' ' + customer.last_name,
                  email: customer.email
                }
              });
          }
      );
  } catch (err) {
      // If there was a problem, tell the user there was a server error
      console.error(err.message);
      res.status(500).json({ message: 'Server error during the login process.' });
  }
};



exports.getClassOptions = async (req, res) => {
  const { serviceType } = req.params;

  try {
    const query = `
      SELECT s.class_type, c.name, c.start_time, c.end_time, c.cost, c.id
      FROM service s
      JOIN class c ON s.id = c.service_id
      WHERE LOWER(s.service_type) = LOWER(?)
        AND c.start_time >= NOW()
      ORDER BY s.class_type, c.start_time
    `;

    // IMPORTANT: use execute consistently (returns [rows])
    const [results] = await db.execute(query, [serviceType]);

    // Always return JSON (React expects response.json())
    if (!results || results.length === 0) {
      return res.status(200).json({
        message: "No upcoming classes found for this subject.",
        data: {}
      });
    }

    const classOptions = {};
    results.forEach(r => {
      const { class_type, name, start_time, end_time, cost, id } = r;
      if (!classOptions[class_type]) classOptions[class_type] = [];
      classOptions[class_type].push({
        id,
        name,
        cost,
        startTime: start_time,
        endTime: end_time
      });
    });

    return res.json({
      message: "Class types and sessions retrieved successfully",
      data: classOptions
    });
  } catch (err) {
    console.error('Error executing query', err);
    return res.status(500).json({
      message: "Error processing your request",
      data: {}
    });
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
  const {
    class_id,
    creditCardNumber, cvc, expirationDate, cardholderFirstName, cardholderLastName,
    addressOne, addressTwo, city, state, zipcode
  } = req.body;

  const customerId = req.user?.customer?.id;

  if (!customerId) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: No customer information found.'
    });
  }

  if (
    !class_id || !creditCardNumber || !cvc || !expirationDate ||
    !cardholderFirstName || !cardholderLastName ||
    !addressOne || !city || !state || !zipcode
  ) {
    return res.status(400).json({
      success: false,
      message: 'Bad request: Missing required parameters.'
    });
  }

  try {
    // Optional: validate class exists
    const [classRows] = await db.execute('SELECT id FROM class WHERE id = ?', [class_id]);
    if (!classRows || classRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Selected class not found.' });
    }

    // 1) Address
    const addressSql =
      'INSERT INTO address (address_one, address_two, city, state, zipcode) VALUES (?, ?, ?, ?, ?)';
    const [addressResult] = await db.execute(addressSql, [
      addressOne,
      addressTwo || null,
      city,
      state,
      zipcode
    ]);
    const addressId = addressResult.insertId;

    // 2) Payment info
    const paymentSql = `
      INSERT INTO payment_info
        (address_id, credit_card_number, cvc, expiration_date, cardholder_first_name, cardholder_last_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [paymentResult] = await db.execute(paymentSql, [
      addressId,
      creditCardNumber,
      cvc,
      expirationDate,
      cardholderFirstName,
      cardholderLastName
    ]);
    const paymentInfoId = paymentResult.insertId;

    // 3) Booking
    const bookingSql =
      'INSERT INTO booking (customer_id, class_id, payment_info_id) VALUES (?, ?, ?)';
    const [bookingResult] = await db.execute(bookingSql, [
      customerId,
      class_id,
      paymentInfoId
    ]);

    return res.status(201).json({
      success: true,
      message: "Payment and booking processed successfully",
      addressId,
      paymentInfoId,
      bookingId: bookingResult.insertId
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during the payment and booking process'
    });
  }
};

  