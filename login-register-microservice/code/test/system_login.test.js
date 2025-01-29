const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const http = require('http'); // Import the HTTP module
const knex = require('knex')(require('../knexfile').development);

chai.use(chaiHttp);

// Import your app
const app = require('../app'); // Adjust the path to your app file
let server; // Define a server variable

describe('System Test: User Login', () => {
  before((done) => {
    // Wrap the app in an HTTP server
    server = http.createServer(app);
    server.listen(4000, () => {
      console.log('Test server running on port 4000');
      done();
    });
  });

  after((done) => {
    server.close(() => {
      console.log('Test server closed');
      done();
    });
  });

  beforeEach(async () => {
    await knex('users').truncate();
    
    await knex('users').insert({
      username: 'testuser',
      email: 'testuser@example.com',
      password: await require('bcrypt').hash('Test@1234', 10),
    });
  });

  it('should log in an existing user', (done) => {
    chai
      .request(server)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'Test@1234',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});