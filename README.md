# approved.js

> An elegant and intuitive way of synchronous and asynchronous data validation and error handling.

Approved.js provides methods for synchronous and asynchronous validation of complex javascript objects and error handling, with unified output error message format.

It is an open source package. The [source code](https://github.com/xpepermint/approvedjs) is available on GitHub where you can also find our [issue tracker](https://github.com/xpepermint/approvedjs/issues).

<img src="giphy.gif" width="300" />

## Motivation

We often write code which validates input data and handles errors. We do it when we write API controllers, GraphQL mutations, before we try to write something into a database and in many other cases where we manipulate and mutate data.

Its pretty unusual that there is no broadly accepted best practice for writing a common logic like this in Javascript. Every time you start writing validations, you ask yourself the same questions, you try hard finding the best way to get a clean and beautiful solution. At the end you desperately start googling for answers, searching best practices and possible conventions. If you are honest you'll admit that all commonly known solutions are rather complex or ugly.

We need to write a clean and beautiful code to keep our projects long-term sustainable. Validation happens before actual action and error handling happens afterwords. That's why validation and error handling go hand in hand. Approved.js has been written with that in mind.

## Installation

Install the package by running the command below.

```
$ npm install --save approved
```

Continue reading to see how this package is supposed to be used.

## Usage

Below, we create a simple example to show the benefit of using Approved.js in your Node.js projects. The code validates an input and creates a new document in a database. If something goes wrong, we read an error and parse it into a user-friendly format.

To make things as clean as possible, we'll use [Babel](https://babeljs.io/) with ES7 features and wrap our code into the `async` block.

```js
(async function() {
  // code here
})().catch(console.error);
```

For the purpose of this tutorial let's first define an imaginary input object which we will validate and save to the database.

```js
const input = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'john@smith.com'
}
```

Continue by defining a sequence of validations which verify the `firstName` field presence and length.

```js
const validations = [
  {path: 'firstName', validator: 'isPresent', message: 'must be present'},
  {path: 'firstName', validator: 'isLength', min: 2, max: 50, message: 'can be between 2 and 50'}
];
```

To show the real benefit of this package let's use the [MongoDB driver](https://docs.mongodb.com/ecosystem/drivers/node-js/) for storing data, with a unique index on the `firstName` field, named `uniqueFirstName`. This will trigger the `E11000` error when the code will be executed for the second time. Using the MongoDB driver and [creating unique indexes](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/) is out of scope for this tutorial and you'll have to figure this yourself.

```js
import {MongoClient} from 'mongodb';

const mongo = await MongoClient.connect('mongodb://localhost:27017/approved');
```

To catch and handle errors we need to define a sequence of handlers which tell how errors are handled. Note that the `ValidationError` handler is defined by default. Let's set an additional handler for handling uniqueness constraint which we defined earlier. We'll use the [mongo-error-parser](https://github.com/xpepermint/mongo-error-parser) package for parsing MongoError message (don't forget to install it).

```js
import mongoParser from 'mongo-error-parser';

const handlers = [
  { path: 'firstName', error: 'MongoError', code: 11000, block: async (err, options) => mongoParser(err).index === 'uniqueFirstName', message: 'is already taken'
  }
]
```

Next, import some Approved.js methods.

```js
import {validateInput, handleError} from 'approved';
```

Add a try/catch block which validates input data, saves data to the database and catches errors.

```js
let result, errors = null;
try {
  // validate input data
  await validateInput(input, validations);
  // saving input object the the database
  result = await mongo.collection('users').insertOne(input);
} catch(err) {
  // handling validation and other errors
  errors = await handleError(err, handlers);
  // raising when unhandled error
  if (!errors) throw err;
}
// display result/errors
console.log({result, errors});
```

When this code is run for the second time the `errors` variable will contain an error message in the same format as validation error message. This is great because your server can directly respond with these user-friendly information.

```json
{
  "result": null,
  "errors": [
    {
      "path": "firstName",
      "message": "is already taken"
    }
  ]
}
```

**NOTE:** It's a good practice to put validations and handlers into a separated file inside the `./approvals` directory which exposes `validations` and `handlers` variables.

## API

TODO
