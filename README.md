# Candidate Takehome Exercise
This is a simple backend engineer take-home test to help assess candidate skills and practices.  We appreciate your interest in Voodoo and have created this exercise as a tool to learn more about how you practice your craft in a realistic environment.  This is a test of your coding ability, but more importantly it is also a test of your overall practices.

If you are a seasoned Node.js developer, the coding portion of this exercise should take no more than 1-2 hours to complete.  Depending on your level of familiarity with Node.js, Express, and Sequelize, it may not be possible to finish in 2 hours, but you should not spend more than 2 hours.  

We value your time, and you should too.  If you reach the 2 hour mark, save your progress and we can discuss what you were able to accomplish.  We do not expect you to "go the extra mile" and spend more than 2 hours on this test.  You will not get extra credit if you spend more than 2 hours.

The theory portions of this test are more open-ended.  It is up to you how much time you spend addressing these questions.  We recommend spending less than 1 hour.  For the record, we are not testing to see how much free time you have, so there will be no extra credit for monumental time investments.  We are looking for concise, clear answers that demonstrate domain expertise.

# Project Overview
This project is a simple game database and consists of 2 components.  

The first component is a Vue.js UI that communicates with an API and renders data in a simple browser-based UI.

The second component is an Express-based API server that queries and delivers data from a SQL-lite data source, using the Sequelize ORM.

This code is not necessarily representative of what you would find in a Voodoo production-ready codebase.  However, this type of stack is in regular use at Voodoo.

# Project Setup
You will need to have Node.js, NPM, and git installed locally.  You should not need anything else.

To get started, initialize a local git repo by going into the root of this project and running `git init`.  Then run `git add .` to add all of the relevant files.  Then `git commit` to complete the repo setup.  You will send us this repo as your final product.
  
Next, in a terminal, run `npm install` from the project root to initialize your dependencies.

Finally, to start the application, navigate to the project root in a terminal window and execute `npm start`

You should now be able to navigate to http://localhost:3000 and view the UI.

You should also be able to communicate with the API at http://localhost:3000/api/games

If you get an error like this when trying to build the project: `ERROR: Please install sqlite3 package manually` you should run `npm rebuild` from the project root.

# Practical Assignments
Pretend for a moment that you have been hired to work at Voodoo.  You have grabbed your first tickets to work on an internal game database application. 

#### FEATURE A: Add Search to Game Database
The main users of the Game Database have requested that we add a search feature that will allow them to search by name and/or by platform.  The front end team has already created UI for these features and all that remains is for the API to implement the expected interface.  The new UI can be seen at `/search.html`

The new UI sends 2 parameters via POST to a non-existent path on the API, `/api/games/search`

The parameters that are sent are `name` and `platform` and the expected behavior is to return results that match the platform and match or partially match the name string.  If no search has been specified, then the results should include everything (just like it does now).

Once the new API method is in place, we can move `search.html` to `index.html` and remove `search.html` from the repo.

#### FEATURE B: Populate your database with the top 100 apps
Add a populate button that calls a new route `/api/games/populate`.  This route should populate your database with the top 100 games in the app store and the google play store.  You are free to use any mean necessary to get and store the information.  Please remember that simple solutions are preferred.


# Theory Assignments
You should complete these only after you have completed the practical assignments.

The business goal of the game database is to provide an internal service to get data for all apps from all app stores.  Many other applications at Voodoo will use this API when they need to get app data. 

#### Question 1
For you what is missing in the project to make it production ready?
#### Answer
There are quite a few things missing to make it production ready. Following is the list:
1. Security  
At the moment there are no security measures in place. We can use "helmet" module to implement several different middlewares which add to the security

2. Routes  
Routes need to seperated from index.js into their own directory. We can further split the routes depending on the module/functionality. Also route for 404 page not found is missing

3. Authentication  
Authentication is missing and we can add a token based authentication even though the app is internal only.

4. Logging  
We can use packages like pino logger/winston to implement structured logging in json format which makes it easy for debugging and gathering information later. It will also allow us to use different logging levels based on the environment

5. Validation  
Inputs from the front end are not validated. We need to implement validation and reject the request early if validation fails. We can use validator.js or express-validator for this purpose.

6. Config  
Config needs to be have seperate files for dev, staging and production

7. Error handling  
We can add a package like Sentry to log all errors to a centralized place which enables developers to respond to error faster. We can also add a global error handler to catch any unhandled exceptions.

8. Testing  
Unit tests are missing negative test(scenarios where the input is invalid). Integration tests also need to be added. There is no way to check coverage. nyc is a good package which works with mocha to provide code coverage

9. Https support  
Https support needs to be added. At the moment its only working on http

10. Mechanism to fetch top 100 games from play store/app store  
At the moment the top 100 games are loaded from a json file for simplicity. We need to call the play store/app store apis to fetch the data directly from their sources.

11. Docker  
We can dockerize the application so that we can spin up multiple instances with minimum effort.

12. Appliacation Performance Monitoring (APM)  
An APM like New Relic should be integrated in code to get realtime performance and error metrics.  

#### Question 2
To achieve the final business goal what is your Roadmap and Action plan?
#### Answer
**Objective**  : We need to get data for all apps from all different app stores and expose it as an API service to be used by other teams.  

**RoadMap**  
- Data feasibility Analysis  
- Technical discussion on implementation approaches  
- Integrate all app stores into the application  
- Implement test suite with good code coverage  
- Add SSL certificates  
- Check security practices  
- Dockerize application  
- Deploy to staging  
- QA automated testing  
- Load testing  
- Create API documentation  
- Create a deployment checklist
- Deploy the service
- Collect feedback from other teams using the service  

*Target deadline* - 2 weeks

**Challenges**    
If the app store apis provide partial data or have rate limits then find alternative way to retrieve remaining data

**Action plan**  
- Make a list of all different play stores from which data has to be collected  
- Check if the api provided by the stores have any kind of limits on data collection at repeated intervals  
- Design the database schema in such a way that queries can be optimized  
- Add appropriate database indexed  
- Upgrade Node.js and other technologies to latest versions so that we can leverage performance improvements  
- Write code for pulling data from different sources and refreshing the data at periodic intervals  
- Use mocha and chai for writing unit tests and nyc for code coverage  
- Add https support to the code
- Implement security measures in code by using different security packages available for Node.js
- Audit for vulnerabilities in code  
- Dockerize the application  
- Deploy the application to staging environment  
- QA will run automated tests and provide the sign off
- Load test the application by simulating load  
- Check if the application passes the deployment checklist  
- Deploy the application to production  