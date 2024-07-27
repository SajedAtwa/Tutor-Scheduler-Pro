const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const providerController = {

    // Extract information from request body
    // Check if provider already exists in database
    // Hash the password using bcrypt
    // Save provider to the database
    // Return success message or error message
    registerProvider: async (req, res) => {
      // Extract information from request body
      const { firstName, lastName, email, password, phoneNumber } = req.body;

      try {
          // Check if provider already exists in the database
          const providerExists = await db.query('SELECT * FROM provider WHERE email = ?', [email]);

          // if (providerExists.length > 0) {
          //     // If provider exists, send a failure response
          //     return res.status(409).json({ message: 'Email already in use.' });
          // }

          // Hash the password using bcrypt
          const salt = await bcrypt.genSalt(10); // Generating a salt
          const hashedPassword = await bcrypt.hash(password, salt); // Hashing the password with the salt

          // Save provider to the database
          const result = await db.query(
              'INSERT INTO provider (first_name, last_name, email, password, phone_number) VALUES (?, ?, ?, ?, ?)',
              [firstName, lastName, email, hashedPassword, phoneNumber]
          );

          // If the result is successful, return a success message
          return res.status(201).json({ message: 'Provider registered successfully.' });
      } catch (error) {
          // If there's an error, return an error message
          console.error('Error registering provider: ', error);
          return res.status(500).json({ message: 'Error registering provider.' });
        }
    },

    // Extract login credentials from request body
    // Validate credentials
    // Retrieve provider from database using email
    // Compare password using bcrypt
    // Generate JWT token if login is successful
    // Send response with token and provider details
    // Handle login failures with appropriate error messages
    loginProvider: async (req, res) => {
      // Extract login credentials from request body
      const { email, password } = req.body;
  
      // Basic credential validation
      if (!email || !password) {
          return res.status(400).json({ message: 'Please provide both email and password.' });
      }
  
      try {
          // Retrieve provider from database using email
          const sql = 'SELECT * FROM provider WHERE email = ?';
          const [providers] = await db.execute(sql, [email]);
  
          // Check if no provider found
          // if (providers.length === 0) {
          //     // If no provider found, send an error
          //     return res.status(401).json({ message: 'Invalid credentials, no such provider found.' });
          // }
  
          const provider = providers[0];
  
          // Compare password using bcrypt
          const isMatch = await bcrypt.compare(password, provider.password);
          if (!isMatch) {
              // If password does not match, send an error
              return res.status(401).json({ message: 'Invalid credentials, password does not match.' });
          }
  
          // Generate JWT token if login is successful
          const payload = {
              provider: {
                  id: provider.id,
                  role: "provider"
              }
          };
  
          jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: '24h' }, // Token expiration set to 24 hours
              (err, token) => {
                  if (err) throw err;
                  // Send response with token and provider details
                  res.json({
                      token,
                      provider: {
                          id: provider.id,
                          name: provider.first_name + ' ' + provider.last_name,
                          email: provider.email
                      }
                  });
              }
          );
      } catch (err) {
          console.error(err.message);
          res.status(500).json({ message: 'Server error during the login process.' });
      }
  },  

    // Takes the selected service type as parameter
    // Retrieve and list all class types under the chosen service type
    // Example: SELECT id, class_type FROM service WHERE service_type = ?;
    selectClassType: async (req, res) => {
      // Extract the service type from the request parameters
      const { serviceType } = req.params;
  
      // Validate that serviceType is provided
      if (!serviceType) {
          return res.status(400).json({
              success: false,
              message: 'Service type parameter is required.'
          });
      }
  
      try {
          // SQL query to retrieve all class types for the specified service type
          const sql = 'SELECT id, class_type FROM service WHERE service_type = ?';
  
          // Execute the query with the provided service type
          const [classTypes] = await db.execute(sql, [serviceType]);
  
          // Check if we received any class types
          if (classTypes.length > 0) {
              res.json({
                  success: true,
                  message: 'Class types retrieved successfully',
                  data: classTypes
              });
          } else {
              // In case no class types are found for the given service type
              res.status(404).json({
                  success: false,
                  message: 'No class types found for the provided service type'
              });
            }
      } catch (error) {
          // Handle any errors during database interaction
          console.error('Failed to retrieve class types:', error);
          res.status(500).json({
              success: false,
              message: 'Error retrieving class types'
          });
        }
    },

    // Provider enters details such as street, city, state, zip
    // Save these details to the address table
    // Retrieve and return the newly created address ID
    // Example: INSERT INTO address (street, city, state, zip) VALUES (?, ?, ?, ?);
    enterAddressDetails: async (req, res) => {
      // Extract address details from the request body
      const { addressOne, addressTwo, city, state, zip } = req.body;
  
      // Basic validation to check if essential address details are present
      if (!addressOne || !city || !state || !zip) {
          return res.status(400).json({
              success: false,
              message: 'Missing required address fields. Address line one, city, state, and zip code are required.'
          });
      }
  
      try {
          // SQL query to insert address details into the address table
          const sql = 'INSERT INTO address (address_one, address_two, city, state, zipcode) VALUES (?, ?, ?, ?, ?)';
  
          // Execute the query
          const result = await db.execute(sql, [addressOne, addressTwo, city, state, zip]);
  
          // Retrieve and return the newly created address ID
          const addressId = result[0].insertId;
  
          // Return the address ID to the provider indicating successful insertion
          res.json({
              success: true,
              message: 'Address details saved successfully.',
              addressId: addressId
          });
      } catch (error) {
          // Handle any errors during the database operation
          console.error('Failed to enter address details:', error);
          res.status(500).json({
              success: false,
              message: 'Error saving address details'
          });
        }
    },
   
    // Takes the service ID from selectClassType, address ID from enterAddressDetails, and other class details
    // Saves the complete class information to the class table
    // Example: INSERT INTO class (provider_id, service_id, address_id, class_name, cost, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?);
    createClass: async (req, res) => {
      const { serviceType, classType, addressId, className, cost, startTime, endTime } = req.body;
  
      if (!serviceType || !classType || !addressId || !className || !cost || !startTime || !endTime) {
          return res.status(400).json({
              success: false,
              message: 'All fields are required (serviceType, classType, addressId, className, cost, startTime, endTime).'
          });
      }
  
      const providerId = req.user.provider.id; // Simplified assumption that this is always present

      console.log('Provider ID:', providerId);
if (!providerId) {
    return res.status(403).json({
        success: false,
        message: 'Unauthorized: No provider information found.'
    });
}

  
      try {
          const serviceSql = 'SELECT id FROM service WHERE service_type = ? AND class_type = ?';
          const [services] = await db.execute(serviceSql, [serviceType, classType]);
  
          if (services.length === 0) {
              return res.status(404).json({
                  success: false,
                  message: 'No service found with the specified type and class type.'
              });
          }
          const serviceId = services[0].id;
  
          const sql = 'INSERT INTO class (provider_id, service_id, address_id, name, cost, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?)';
          const result = await db.execute(sql, [providerId, serviceId, addressId, className, cost, startTime, endTime]);
  
          res.json({
              success: true,
              message: 'Class created successfully',
              classId: result[0].insertId
          });
      } catch ( error ) {
          console.error('Error creating class:', error);
          res.status(500).json({
              success: false,
              message: 'Server error occurred while creating the class.'
          });
      }
  },
  

    // Retrieve and list all classes linked to the logged-in provider
    // Example: SELECT * FROM class WHERE provider_id = ?;
    listClasses: async (req, res) => {
      // Assuming the provider ID is extracted from a verified JWT token
      // This assumes your JWT token verification middleware has already run and attached the provider to req
      if (!req.user.provider || !req.user.provider.id) {
          return res.status(403).json({
              success: false,
              message: 'Unauthorized: No provider information found.'
          });
      }
      const providerId = req.user.provider.id;
  
      try {
          // SQL query to retrieve all classes linked to the logged-in provider
          const sql = 'SELECT * FROM class WHERE provider_id = ?';
          
          // Execute the query with the provider ID
          const [classes] = await db.execute(sql, [providerId]);
  
          // Check if we received any classes
          if (classes.length > 0) {
              res.json({
                  success: true,
                  message: 'Classes retrieved successfully',
                  data: classes
              });
          } else {
              // In case no classes are found for the given provider
              res.status(404).json({
                  success: false,
                  message: 'No classes found for the provided provider ID'
              });
            }
      } catch (error) {
          // Log and handle any errors during database interaction
          console.error('Failed to list classes:', error);
          res.status(500).json({
              success: false,
              message: 'Error retrieving classes'
          });
        }
    },

    updateClass: async (req, res) => {
      // Extract class details and class_id from request body
      const { classId, newClassName, newCost, newStartTime, newEndTime } = req.body;
  
      // Basic validation to ensure class_id and new details are provided
      if (!classId || !newClassName || newCost === undefined || !newStartTime || !newEndTime) {
          return res.status(400).json({
              success: false,
              message: 'All fields including classId, newClassName, newCost, newStartTime, and newEndTime are required.'
          });
      }
  
      try {
          // SQL query to update the class based on class_id
          const sql = 'UPDATE class SET class_name = ?, cost = ?, start_time = ?, end_time = ? WHERE id = ?';
          const [result] = await db.execute(sql, [newClassName, newCost, newStartTime, newEndTime, classId]);
  
          // Check if the update was successful
          if (result.affectedRows > 0) {
              res.json({
                  success: true,
                  message: 'Class updated successfully.'
              });
          } else {
              // If no rows were affected, the class_id might be wrong or non-existent
              res.status(404).json({
                  success: false,
                  message: 'No class found with the provided ID to update.'
              });
            }
      } catch (error) {
          // Handle any errors that might occur during database interaction
          console.error('Failed to update class:', error);
          res.status(500).json({
              success: false,
              message: 'Server error occurred while trying to update the class.'
          });
        }
    },

    removeClass: async (req, res) => {
      // Assuming the provider ID is extracted from a verified JWT token
      if (!req.provider || !req.provider.id) {
          return res.status(403).json({
              success: false,
              message: 'Unauthorized: No provider information found.'
          });
      }
      const providerId = req.provider.id;
  
      // Extract class_id from the request body
      const { classId } = req.body;
  
      // Check if classId is provided
      if (!classId) {
          return res.status(400).json({
              success: false,
              message: 'Class ID is required to delete a class.'
          });
      }
  
      try {
          // SQL query to delete the class from the class table where both provider_id and class_id match
          const sql = 'DELETE FROM class WHERE id = ? AND provider_id = ?';
  
          // Execute the deletion query
          const [result] = await db.execute(sql, [classId, providerId]);
  
          // Check if any row was actually deleted
          if (result.affectedRows > 0) {
              res.json({
                  success: true,
                  message: 'Class deleted successfully.'
              });
          } else {
              // No class found with the given ID under the provider's ID
              res.status(404).json({
                  success: false,
                  message: 'No class found with the provided ID for this provider.'
              });
            }
      } catch (error) {
          // Handle any errors during the database operation
          console.error('Failed to delete class:', error);
          res.status(500).json({
              success: false,
              message: 'Server error occurred while trying to delete the class.'
          });
        }
    },
};

module.exports = providerController;