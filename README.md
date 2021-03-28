**User Guide:**

    - user can search by first name, last name or email for an employee.
    - user can filter the employees list by department or country
    - user can click on any employee, and then a form will open with all the employee details. The use can also delete and edit the employee.
    - when on home page the user can click on create to create a new employee.

**Frontend:**

    - setup: 
        npm install
    - dev:
        npm start
    - go to http://localhost:3000/employees

**Backend:**

    - setup: 
        npm install
    - dev:
        npm start
    - apis found at localhost:4000/api/v1/, for example to get all employees: localhost:4000/api/v1/employee?page=1

**Database:**

    - data seed: 
        cd /backend
        export PATH="./node_modules/.bin:$PATH"
        md-seed run
        md-seed run --dropdb: drop the db before seeding
    - connection string to DB is under:
        /backend/config/properties

**Tools and libs:**

    - React for the front end 
    - Bootsrap-react lib is used for styling and responsivness
    - Nodejs/express for back end
    - mongdb as the database
    - mongoose for facilitation mongodb relations and data modeling
    - mongoose database seed for data seeding (https://www.npmjs.com/package/mongoose-data-seed)
    - faker lib for generation random data
    - multer lib is used to handle files uploading

**Dev notes:**

    - Requires connection to the internet to load the randomly generated url images from faker.
    - Static files like images are served by the node server in the ./public directory.
    - Added postman collection with the available apis.(Postlight-Code-Challenge.postman_collection.json)
