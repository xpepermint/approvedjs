import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import {approval} from './approvals/user';

// creating application
const app = new Koa();
app.use(bodyParser());

// handling requests
app.use(async (ctx) => {
  let data = ctx.request.body;
  let errors, status = null;

  try {
    // filter data
    data = await approval.filter(data, ctx);
    // validate data
    await approval.validate(data, ctx);
    // data can be saved to DB
    status = 200;
  } 
  catch(err) {
    // wrap errors into user-friendly format
    errors = await approval.handle(err, ctx);
    // remember error status code
    if (errors) {
      status = err.code;
    } 
    // handle unknown errors
    else {
      throw err;
    }
  }

  // show data/errors to a user
  ctx.status = status;
  ctx.body = {data, errors};
});

// server started
app.listen(3000, () => console.log('Listening on port 3000 ...'));
