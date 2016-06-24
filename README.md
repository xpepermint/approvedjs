# New API Proposal

## Defining Approval v1 (no)

**WHY NOT?**: Exposing objects like this is cool but not a safe way. You are
forced to define filters on the class.

```js
exports.User = class extends Schema {

  static const filters = [
    {
      path: 'name',
      type: 'string',
      modifiers: ['squish', 'toLowerCase']
    }
  ];

  static const validators = [
    {
      path: 'name',
      validator: 'isPresent',
      message: 'must be present'
    }
  ];

  static const handlers = [
    {
      path: 'system',
      error: 'Error',
      options {code: 500, block: async (value) => true},
      message: 'something went wrong'
    }
  ];

  async save() {
    // custom code here
  }
};
```

## Defining Approval v2 (no)

**WHY NOT?**: Exposing objects like this is cool but not a safe way.

```js
exports.User = class extends Schema {

  constructor(input, context) {
    super(input, context);

    this.filters = [
      {
        path: 'name',
        type: 'string',
        modifiers: ['squish', 'toLowerCase']
      }
    ];

    this.validators = [
      {
        path: 'name',
        validator: 'isPresent',
        message: 'must be present'
      }
    ];

    this.handlers = [
      {
        path: 'system',
        error: 'Error',
        options {code: 500, block: async (value) => true},
        message: 'something went wrong'
      }
    ];
  }

  async save() {
    // custom code here
  }
};
```

## Defining Approval v3 (no)

**WHY NOT?**: Not the right way beacuse a method have more then 3 arguments. It's
also not aesthetic.

```js
import {Schema} from 'approved';

export class extends Schema {

  constructor(input, context) {
    super(input, context);

    this.addFilter('name', 'string', {modifiers: ['squish']});

    this.addValidation('name', 'isPresent', 'must be present');

    this.addHandler('system', 'Error', 'something went wrong', {code: 500});
  }

  async save() {
    // custom code here
  }
};
```

## Defining Approval v4 (yes)

Schema can be extended and used as a model class.

```js
import {Schema} from 'approved';

export class extends Schema {

  constructor(input, context) {
    super(input, context);

    this.addFilter({
      path: 'name',
      type: 'string',
      modifiers: ['squish', 'toLowerCase']
    });

    this.addValidation({
      path: 'name',
      validator: 'isPresent',
      message: 'must be present'
    });

    this.addHandler({
      path: 'system',
      error: 'Error',
      options {code: 500, block: async (value) => true},
      message: 'something went wrong'
    });
  }

  async save() {
    // custom code here
  }
};
```

We can use it without extending the class.

```js
import {Schema} from 'approved';

let schema = new Schema({
  name: 'John Smith',
  email: 'john@smith.com'
});

schema.addFilter({
  path: 'name',
  type: 'string',
  modifiers: ['squish', 'toLowerCase']
});

schema.addValidation({
  path: 'name',
  validator: 'isPresent',
  message: 'must be present'
});

schema.addHandler({
  path: 'system',
  error: 'Error',
  options {code: 500, block: async (value) => true},
  message: 'something went wrong'
});

```

## Usage v1 (yes)

```js
import {User} from 'approvals/user';

// creating an instance
const user = new User({
  name: 'John Smith',
  email: 'john@smith.com'
});

// validating and executing a custom method
let data, errors = null
try {
  await user.filter(); // not required (don't have to be inside try/catch block)
  await user.validate(); // not required
  data = await user.save(); // executing a custom method
} catch(err) {
  errors = await user.handle(err, (err) => null)); // return [] on unhandled error (default is null)
  if (!errors) throw err;
}
```

## Response v1 (yes)

```js
{
  data: null,
  errors: [
    {
      path: 'name',
      message: 'must be present',
      kind: 'ValidationError'
    },
    {
      path: 'system',
      message: 'something went wrong',
      kind: 'Error'
    }
  ]
}
```

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

### Validation & Error Handling

Below, we create a simple example to show the benefit of using Approved.js in your Node.js projects. In this tutorial we will validate an input and create a new document in a database. If something will go wrong, an error will be catched and parsed into a user-friendly format.

To make things as clean as possible, we'll use [Babel](https://babeljs.io/) with ES7 features and thus we will be able to wrap our code into the `async` block.

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

Instantiate the main `Approval` class.

```js
import {Approval} from 'approved';

let approval = new Approval();
```

Continue by defining a sequence of validations for the `firstName` field.

```js
const validations = [
  {
    path: 'firstName',
    validator: 'isPresent',
    message: 'must be present'
  }, {
    path: 'firstName',
    validator: 'isLength',
    options: {min: 2, max: 50},
    message: 'can be between 2 and 50'
  }
];
```

To show the real benefit of this package let's use the [MongoDB driver](https://docs.mongodb.com/ecosystem/drivers/node-js/) for storing data, with a unique index on the `firstName` field, named `uniqueFirstName`. This will trigger the `E11000` error when the code will be executed for the second time. How to use the MongoDB driver and how to [create a unique indexe](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/) is out of scope for this tutorial and you'll have to figure this yourself.

```js
import {MongoClient} from 'mongodb';

const mongo = await MongoClient.connect('mongodb://localhost:27017/approved');
```

To catch and handle errors we need to define a sequence of handlers which tell how errors are handled. Note that the `ValidationError` handler is defined by default. Let's set an additional handler for handling uniqueness constraint which we defined earlier. We'll use the [mongo-error-parser](https://github.com/xpepermint/mongo-error-parser) package for parsing MongoError message (don't forget to install it).

```js
import mongoParser from 'mongo-error-parser';

const handlers = [
  {
    path: 'firstName',
    error: 'MongoError',
    options: {
      code: 11000,
      block: async (err) => mongoParser(err).index === 'uniqueFirstName'
    }
    message: 'is already taken'
  }
];
```

Add a try/catch block which validates input data, saves data to the database and catches errors.

```js
const {validateInput, handleError} = approval;

let result, errors = null;
try {
  // validating input data
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

When this code is executed for the second time the `errors` variable will contain an error message in the same format as validation error messages. This is great because your server can directly respond with this user-friendly information.

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

### Input Filters

In most cases we deal with data objects thus type casting isn't needed. However, in some cases we need to extract certain keys into a new object. In some cases we also need to cast values to a certain data type.

Approved.js includes a method called `filterInput` which allows for filtering input against a list of  filters we provide. This is great for cases where we need to save an object to a database thus we can first filter out unknown keys, modify object values and then safely insert data into a database.

Let's first define `filters` for our input object.

```js
const filters = [
  {
    path: 'firstName',
    type: 'string',
    modifiers: ['squish'],
    block: (s) => `**${s}**`
  }
];
```

Then somewhere in our code we filter the input object.

```js
let data = await approval.filterInput(input, filters); // -> {firstName: "**John**"}
```

## API

The core of this package represents the `Approval` class.

```js
import {Approval} from 'approved';

const approval = new Approval();
```

### Instance Methods

### approval.filterInput(input, filters);

> Filters data object against the provided filters and returns a new object containing only keys defined by the filters. Object values are modified by the provided modifiers and cast to the desired data type.

| Arguments | Type | Required | Description
|-----------|------|----------|------------
| input | Object | Yes | Data object with keys to be filtered.
| filters | Array | Yes | List of filter objects.

```js
await filterInput({
  name: 'John Smith'
}, [{
  path: 'name',
  type: 'string',
  modifiers: ['squish']
}]);
```

#### approval.validateInput(input, validations);

> Validates data object against the provided validations and throws a ValidationError if at least one key value is not valid.

| Arguments | Type | Required | Description
|-----------|------|----------|------------
| input | Object | Yes | Data object with keys to be validated.
| validations | Array | Yes | List of validation objects.

```js
await validateInput({
  name: 'John Smith'
}, [{
  path: 'name',
  validator: 'isPresent',
  message: 'must be present'
}]);
```

#### approval.handleError(error, handlers);

> Handles the provided Error object based on the provided handlers.

| Arguments | Type | Required | Description
|-----------|------|----------|------------
| error | Object | Yes | Error class instance or error object.
| handlers | Array | Yes | List of handler objects.
| options | Object | No | Filter settings.

```js
try {
  throw new Error('Fake error');
} catch(err) {
  let errors = await handleError(err, [{
    path: 'base',
    error: 'Error',
    message: 'something went wrong'
  }]);
}
```

### Filters

Filter object defines how a value of an input object key is casted and filtered by the `filterInput` method.

| Key | Type | Required | Description
|-----|------|----------|------------
| path | String | Yes | Key name of an input object (e.g. firstName). Nested object paths are also supported (e.g. `users.name.first`)
| type | String | Yes | Data type name (possible values are `boolean`, `date`, `float`, `integer` or `string`).
| modifiers | Array | No | List of modifiers.
| block | Function | No | Synchronous or asynchronous resolver (e.g. `async (s) => s`)

```js
const filter = {
  path: 'name',
  type: 'string',
  modifiers: ['squish'],
  block: (s, o) => s
};
```

#### Modifiers

Modifiers transform a value.

##### squish

> Removes white-spaces on both ends of the string and changes remaining consecutive whitespace groups into one space each.

##### toLowerCase

> Converts characters in the string to lowercase.

##### toUpperCase

> Converts characters in the string to uppercase.

### Validations

Validation object defines how a value of an input object key is validated by the `validateInput` method.

| Key | Type | Required | Description
|-----|------|----------|------------
| path | String | Yes | Key name of an input object (e.g. firstName). Nested object paths are also supported (e.g. `users.name.first`)
| validator | String | Yes | Validator name (see the `Built-in Validators` section for a list of available names).
| options | Object | No | Validator settings.
| message | String | Yes | Output error message explaining what went wrong.

```js
let validation = {
  path: 'name',
  validator: 'isPresent',
  message: 'must be present'
};
```

#### Built-in Validators

##### contains

> Checks if the string contains the seed.

| Option | Type | Required | Default | Description
|--------|------|---------|----------|------------
| seed | String | Yes | - | The seed which should exist in the string.

##### isAbsent

> Validates that the specified attribute is blank.

##### isBase64

> Validates that the specified attribute is base64 encoded string.

##### isByteLength

> Validates that the specified attribute is a string where length (in bytes) falls in a range.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| min | Integer | Yes | 0 | Minimum number in bytes.
| max | Integer | Yes | - | Maximum number in bytes.

##### isCreditCard

> Validates that the specified attribute is a credit card number.

##### isDate

> Validates that the specified attribute is a date string.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| format | String | No | - | Date format (possible value is `iso8601`).

##### isEmail

> Validates that the specified attribute is an email.

| Option | Type | Required | Default | Description
|--------|------|----------|----------|------------
| allowDisplayName | Boolean | No | false | When set to true, the validator will also match `name <address>`.
| allowUtf8LocalPart | Boolean | No | false | When set to false, the validator will not allow any non-English UTF8 character in email address' local part.
| requireTld | Boolean | No | true | When set to false, email addresses without having TLD in their domain will also be matched.

##### isExcluded

> Validates that the specified attribute is not in an array of restricted values.

| Option | Type | Required | Description
|--------|------|----------|------------
| values | Array | Yes | Array of restricted values.

##### isFQDN

> Validates that the specified attribute is a fully qualified domain name (e.g. domain.com).

| Option | Type | Required | Description
|--------|------|----------|------------
| requireTld | Boolean | No | Require top-level domain name.
| allowUnderscores | Boolean | No | Allow string to include underscores.
| allowTrailingDot | Boolean | No | Allow string to include a trailing dot.

##### isHexadecimal

> Validates that the specified attribute is a hexadecimal number.

##### isHexColor

> Validates that the specified attribute is a hexadecimal color string.

##### isIncluded

> Validates that the specified attribute is in an array of allowed values.

| Option | Type | Required | Description
|--------|------|----------|------------
| values | Array | Yes | Array of allowed values.

##### isIP

> Validates that the specified attribute is an IP.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|-------------
| version | Integer | No | - | IP version (4 or 6).

##### isISBN

> Validates that the specified attribute is an [International Standard Book Number](https://en.wikipedia.org/wiki/International_Standard_Book_Number).

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| version | Integer | No | - | IP version (10 or 13).

##### isISIN

> Validates that the specified attribute is an [International Securities Identification](https://en.wikipedia.org/wiki/International_Securities_Identification_Number).

##### isJSON

> Validates that the specified attribute is a stringified JSON string.

##### isLength

> Validates the length of the specified attribute.

| Option | Type | Required | Default | Description
|--------|------|----------|----------|------------
| min | Number | No | 0 | Minimum number of characters.
| max | Number | No | - | Maximum number of characters.

##### isLowercase

> Validates that the specified attribute is lowercase.

##### isMACAddress

> Validates that the specified attribute is a MAC address.

##### isMongoId

> Validates that the specified attribute is a valid hex-encoded representation of a [MongoDB ObjectId](http://docs.mongodb.org/manual/reference/object-id/).

##### isPresent

> Validates that the specified attribute is not blank.

##### isUppercase

> Validates that the specified attribute is uppercase.

##### isURL

> Validates that the specified attribute is an URL.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| protocols | Array | No | ['http', 'https', 'ftp'] | List of known protocols (e.g. http, https, ftp).
| requireTld | Boolean | No | true | Require top-level domain name.
| requireProtocol | Boolean | No | true | Require URL protocol.
| requireValidProtocol | Boolean | No | true | Require a valid protocol.
| allowUnderscores | Boolean | No | false | Allow using underscores.
| allowTrailingDot | Boolean | No | false | Allow trailing dot.
| allowProtocolRelativeUrls | Boolean | No | false | Allow protocol relative urls (e.g. //foobar.com)

##### isUUID

> Validates that the specified attribute is a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier).

| Option | Type | Required | Description
|--------|------|----------|------------
| version | Integer | No | UUID version (3, 4 or 5).

##### isValid

> Validates the specified attribute against the provided block function. If the function returns true then the attribute is treated as valid.

| Option | Type | Required | Description
|--------|------|----------|------------
| block | Function | Yes | Synchronous or asynchronous function (e.g. `async () => true`)

```js
let validation = {
  path: 'name',
  validator: 'isValid',
  options: {block: async (value, options) => true},
  message: 'must be present'
};
```

##### matches

> Validates that the specified attribute matches the pattern.

| Key | Type | Required | Description
|-----|------|----------|------------
| pattern | String | Yes | Regular expression pattern.
| modifiers | String | No | Regular expression modifiers.

### Handlers

Handler object defines how an error is handled by the `handleError` method.

| Key | Type | Required | Description
|-----|------|----------|------------
| path | String | Yes | The output key name or a key name of an input object to which the error refers to.
| error | Object | Yes | Error class instance.
| options | Object | No | Handler options. You can set the `code` and `block` keys to additionally check if the handler applies to the provided error.
| message | String | Yes | Output error message explaining what went wrong.

```js
let handler = {
  path: 'system',
  error: 'Error',
  options {code: 500, block: async (value) => true},
  message: 'something went wrong'
};
```

## Advanced Usage

You can completely customize how this module behaves by overriding the instance public methods or by defining your custom validators (check the source code for more).

### Custom Type

To create a custom data type, define a custom method on the `approval.types` object which parses the input value.

```js
let approval = new Approval();

approval.types.cooltype = (value, options) => {
  return `cool-${value}`; // not a very smart example :)
};
```

### Custom Modifier

To create a custom data modifier, define a custom method on the `approval.modifiers` object.

```js
let approval = new Approval();

approval.types.coolerize = (value, options) => {
  return `cool-${value}`; // not a very smart example :)
};
```

### Custom Validator

To create a custom validator, define your custom method on the `approval.validators` object.

```js
let approval = new Approval();

approval.validators.isCool = (value, options) => {
  return str === 'cool';
};

validateInput({
  word: 'cool'
}, [{
  path: 'word',
  validator: 'isCool',
  message: 'must be cool'
}]);
```

## License (MIT)

```
Copyright (c) 2016 Kristijan Sedlak <xpepermint@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
