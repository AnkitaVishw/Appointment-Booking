
**Project Outline: Appointment Scheduling Web Application**

**Local Deployment and Testing:**
1. **Frontend Setup:**
   - Clone the project's GitHub repository.
   - Navigate to the frontend directory.
   - Run `npm install` to install dependencies.
   - Modify the API endpoint URLs in your React components to point to your local backend server.
    - Run the book-appointment page using npm start.
2. **Backend Setup:**
   - Navigate to the backend directory.
   - Set up a MySQL database with table_name (appointments) and schema---

    CREATE TABLE appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        day VARCHAR(255) NOT NULL,
        appointment_date DATE NOT NULL,
        timeSlot VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        phoneNumber BIGINT NOT NULL
        );

   - Update the database configuration in the backend code.
   - Run the Node.js server using `node index.js`.
   - For notification I used twilio so if you want to use same then you have to create account in twilio and you will get SID number and Auth token and in index.js file in you have to provide that information.

   In this part of code-----
                const accountSid = 'Your_accountSid';
                const authToken = 'Your_authToken';
   And you have to genrate a twilio number also which you have to provide in this part of code---
                twilioClient.messages
                    .create({
                    body: message,
                    from: 'Your_twilio number',
                    to: phoneNumber, 
                    })
   - If you are using twilio for free trial you have to add your number and verify that to get notification.   
3. **Testing:**
   - Access the application in a web browser (origin: 'http://localhost:3000' ).
   - Test various functionalities, including viewing available time slots, booking appointments, and receiving notifications.
   - Check the database to verify that appointment data is being stored correctly.
    

4. **Debugging and Troubleshooting:**
   - Use browser developer tools and server logs for debugging.
   - Ensure that your notification system is set up correctly for testing purposes.
