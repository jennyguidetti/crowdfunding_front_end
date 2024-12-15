# ParimediX Plus
A crowdfunding app where paramedics can do work experience with other ambulance services

[ParimediXPlus](https://paramedixplus.netlify.app/)

### User Stories
- Sally is a paramedic who works for the Queensland Ambulance Service. She is thinking of moving interstate and wants to see what it is like to work in NSW. She can pledge 20 hours of work experience to NSW Ambulance Service to see if she likes working there. 
- The Queensland Ambulance Service is interested in having paramedics from NSW do ride along shifts to learn what differences exist in the clinical and operational protocols

### Critical Features
- Users can create an account
- Users can login
- Users can make pledge to ambulance service
- Users can make ambulance service project
- Users can view their own account details

### How to create a new project
1. Make POST request at /api-token-auth/ endpoint
2. Ensure 'Body' contains mandatory fields provided in JSON format: username, password
3. Send request to receive 200 response and authorisation token

![homepage](./public/src/img/homepage.png)

![project page](./public/src/img/projectpage.png)

![create project](./public/src/img/createproject.png)

