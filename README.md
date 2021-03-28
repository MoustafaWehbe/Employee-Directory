User Guide:

    - user can search by first name, last name or email for an employee.
    - user can filter the employees list by department or country
    - user can click on any employee, and then a form will open with all the employee details. The use can also delete and edit the employee.
    - when on home page the use can click on create to create a new employee.


backend:

    - setup: 
        npm install
    - dev:
        npm start

database:

    - data seed: 
        cd /backend
        export PATH="./node_modules/.bin:$PATH"
        md-seed run
        md-seed run --dropdb: drop the db before seeding
    - connection string to DB is under:
        /backend/config/properties

Dev notes:

    - Requires connection to the internet to load the randomly generated url images from faker.
    - Static files like images are served by the node server in the ./public directory.
