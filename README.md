# approved.js

> An elegant and intuitive way of synchronous and asynchronous data validation and error handling.

Approved.js provides methods for synchronous and asynchronous validation of complex javascript objects and error handling, with unified output error message format.

It is an open source package. The [source code](https://github.com/xpepermint/approvedjs) is available on GitHub where you can also find our [issue tracker](https://github.com/xpepermint/approvedjs/issues).

<img src="giphy.gif" width="300" />

## Motivation

We often write code which validates input data and handles errors. We do it when we write API controllers, GraphQL mutations, before we try to write something into a database and in many other cases related to data manipulation and data mutation.

Its pretty unusual that there is no broadly accepted best practice for writing a common logic like this in Javascript. Every time you start writing validations, you ask yourself the same questions, you try hard finding the best way to get a clean and beautiful solution. At the end you desperately start googling for answers, best practices and possible conventions. If you are honest you'll admit that all commonly known solutions are rather complex or ugly.

We need to write a clean and beautiful code to keep our projects long-term sustainable. Validation happens before actual action and error handling happens afterwords. That's why validation and error handling go hand in hand. Approved.js has been written with that in mind.

## Showcase

Let's say that we need to write a [Koa2](http://koajs.com/) middleware which accepts form input data, validates the input and then creates a new record in a database if the input is valid. The middleware will look something like the example below (this will be pretty similar in [Express](http://expressjs.com/) and [GraphQL](graphql.org)).

```js
import {validateInput, handleError} from 'approved';
import {validations, handlers} from './approvals/user';

async (ctx, next) => {
  let input = ctx.req.body;

  let result, errors = null;
  try {
    await validateInput(input, validations);
    result = await ctx.mongodb.collection('users').insertOne(input);
  } catch(err) {
    errors = await handleError(err, handlers);
  }

  ctx.body = {result, errors};
}
```

This is only an example so don't try figuring out the logic. This is just to demonstrate how easy, clean and beautiful it is to write a controller which includes validation and error handling. Note that all errors, no matter the type, are in the same format. In case the validation fails or the database fails to save the document (e.g because the user already exists in the database), the server will respond with errors which are formatted in the same way.

## Setup

**Step 0:** Install the package by running the command below.

```
$ npm install --save approved
```

**Step 1:** Create a new file `./approvals/user.js` and add configuration.

```js
export const validations = [
  {path: 'firstName', validator: 'isPresent', message: 'must be present'},
  {path: 'firstName', validator: 'isLength', min: 2, max: 50, message: 'can be between 2 and 50'}
];

export const handlers = [
];
```

**Step 2:** Write approved code block.

```js
// importing approved methods
import {validateInput, handleError} from 'approved';
// importing approval from step 1
import {validations, handlers} from './approvals/user';

// defining sample data object
let input = {
  firstName: 'John',
  lastName: 'Smith'
};

// starting main code block
(async function() {
  let result, errors = null;

  try {
    // validate input data
    await validateInput(input, validations);
    // data manipulation goes here (e.g. write something to database)
    result = 'Input object is valid';
  } catch(err) {
    // handling validation and other system errors
    errors = await handleError(err, handlers);
    // raising unhandled errors
    if (!errors) throw err;
  }

  // display result/errors
  console.log({result, errors});

})().catch(console.error);
```

## API

TODO
