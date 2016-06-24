import {User} from './approvals/user';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

// creating application
const app = new Koa();
app.use(bodyParser());

// handling requests
app.use(async (ctx) => {
  let user = new User(ctx.request.body);
  let data, errors, status = null
  try {
    await user.filter();
    await user.validate();
    data = await user.save();
    status = 200;
  } catch(err) {
    errors = await user.handle(err);
    if (errors) {
      status = err.code;
    } else {
      throw err;
    }
  }
  ctx.status = status;
  ctx.body = {data, errors};
});

// server started
app.listen(3000, () => console.log('Server is listening on port 3000 ...'));
