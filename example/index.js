/*
* Approved.js initialization.
*/

const {Approval} = require('../src');
// creating approval instance
const approval = new Approval();
// adding custom validator
approval.validators.isCool = require('./validators/isCool');
// defining validations
const {validations, filters} = require('./approvals/user');

/*
* KOA HTTP server example.
*/

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// creating application
const app = new Koa();
app.use(bodyParser());
// handling requests
app.use(async (ctx) => {
  try {
    let data = await approval.filterInput(ctx.request.body, filters);
    await approval.validateInput(data, validations);
    ctx.status = 200;
    ctx.body = data;
    console.log('Response:', data);
  } catch(err) {
    let errors = await approval.handleError(err);
    ctx.status = err.code;
    ctx.body = {errors};
    console.log('Response:', {errors});
  }
});
// server started
app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
  console.log('Run the command below to see the response.');
  console.log('');
  console.log('   curl -X "POST" "http://localhost:3000/" -H "Content-Type: application/json"');
  console.log('');
});
