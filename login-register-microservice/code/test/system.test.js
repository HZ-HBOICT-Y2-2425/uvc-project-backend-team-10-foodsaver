const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const http = require('http'); // Import the HTTP module
const knex = require('knex')(require('../knexfile').development);

chai.use(chaiHttp);

// Import your app
const app = require('../app'); // Adjust the path to your app file
let server; // Define a server variable

describe('System Test: User Registration and Login', () => {
  before((done) => {
    // Wrap the app in an HTTP server
    server = http.createServer(app);
    server.listen(4000, () => {
      console.log('Test server running on port 4000');
      done();
    });
  });

  after((done) => {
    // Close the server after all tests
    server.close(() => {
      console.log('Test server closed');
      done();
    });
  });

  beforeEach(async () => {
    // Truncate the users table before each test
    await knex('users').truncate();
  });

  it('should register a new user', (done) => {
    chai
      .request(server) // Pass the server, not the app
      .post('/register') // Replace with your endpoint
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Test@1234',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('success', true);
        done();
      });
  });
});



