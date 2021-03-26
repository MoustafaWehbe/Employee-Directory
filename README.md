setup: 
    npm install
dev:
    npm start

data seed: 
    cd /backend
    export PATH="./node_modules/.bin:$PATH"
    md-seed run
    md-seed run --dropdb: drop the db before seeding


brew services restart mongodb-community@4.4 (/user/local)

added @babel/core package to support es6