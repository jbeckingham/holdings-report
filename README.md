# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
  - The report should be sent to the `/export` route of the investments service
  - The investments service expects the report to be sent as csv text
  - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
  - The holding should be the name of the holding account given by the financial-companies service
  - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:

- Functional code
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes

All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around _1-2 hours_ working on it

## Deliverables

**Please make sure to update the readme with**:

- Your new routes
- How to run any additional scripts or tests you may have added
- Relating to the task please add answers to the following questions;

  1. How might you make this service more secure?

     - From outside the network, all access to the admin service would require a token generated via a secure login/method of authentication - ideally associated with a particular access profile which specifies which endpoints should be available to them only giving access to the ones required. Tokens can also be associated with which data they should be able to retrieve (in the case that the investment service can access user data not only for the admin in question’s company). From inside the network a static access token would be acceptable for testing.
     - For the sake of this exercise I am assuming the investments and companies endpoints are internal only - so we would make sure you can only access them from inside of the network. (Although I understand these may be the equivalent of our developer apis, which may require their own type of authentication keys and access profiles supplied to developers, similar to above).

  2. How would you make this solution scale to millions of records?

     - If the company data gets large, we can cache this locally to avoid pulling that through via HTTP each time and make sure it is periodically updated.
     - I would batch the retrieval and processing of the data to a configurable batch size and then pipe this through to the export service as it runs. This would require updates to the investment service to send over subsets of data, and updates to the export service to be able to upload it as chunks.
     - Add functionality to the api and frontend to add filters to the request for this like time, user and company to avoid users unnecessarily requesting large volumes of data.

  3. What else would you have liked to improve given more time?
     -I would have moved out the calls to the industries and companies services from index.js as I don’t think they belong in the route.
     - Implemented logic for when a company with an id cannot be found - whether that means skipping the record and logging the failures, having that row have an null value for that field or failing the whole export. I have left it as having an empty value for the holding name.
     - Similar to the above, I would have implemented better handling of invalid data/missing data. At the moment those entries would return empty on the report. Again, would have to decide whether to skip those rows or fail the whole process (could even take a “skip-invalid” parameter).
     - Move out the csv label mapping into config as this is something which could have fields added to at a later date.
     - I was quite proactive in using ramda where I could - would have liked to have had time to consider more if what I used was the best tool for the job, I may have been too keen!

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

## Running tests

Tests have been added to the admin service in this project using Jest. To run, use the following command from the admin directory:

```bash
npm run test
```

### Existing routes

We have provided a series of routes

Investments - localhost:8081

- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082

- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083

- `/investments/:id` get an investment record by id
- POST `/holdingsReport` generate a report of all holdings and sends it to investments export service
