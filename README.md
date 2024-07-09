# citizencareev-server-v1.0
## npm start

Starts server with DB in production mode , which will be on cloud ( currently unavailable, so not gonna work )
helllooo

## npm run dev

Starts development server with local MongoDB database,

## Must know libraries

1. [Mongoose ORM](https://mongoosejs.com/), for mongodb models
   1.1 [mongodb native driver](https://mongodb.github.io/node-mongodb-native/) mongodb official driver for nodejs

## coding guidelines

1. refer the following for status codes used

```
200 - successful response
201 - successful and resource created
204 - successful, but no content is returned (POST, PUT, PATCH)
400 - bad request (if some data is in invalid format)
401 - unauthorized
403 - forbidden
404 - resource(s) not found
409 - conflict (resource already exists)
500 - server error
```

1. use camel case
2. use [async await ](https://www.youtube.com/watch?v=AyJq1RRaY_k) for async requests, try avoiding callbacks

```
async getAsync(){
    try{

    const response= await doAsyncOperation();
    }catch(error){


    }
}
```

3. use object [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to pull request body information .
   [res]("https://medium.com/podiihq/destructuring-objects-in-javascript-4de5a3b0e4cb)

- recommended

```
const {firstName,lastName}=req.body;
```

- not recommended

```
const firstName=req.body.firstName;
const lastName =req.body.lastName;
```

4. use `const` & `let` only. Avoid using `var`

   `const` for variables that do not reassigned
   `let` for variables that needs to be reassigned

[Why?](https://www.youtube.com/watch?v=BNC6slYCj50&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP&index=9)

#### Controller description

```
@disc   descriptions of the controller at most 20 characters
@access public, private, role["admin","user","employee"]
@url    GET/POST/PUT/DELETE  api/v1/user/:userId
```

## Git instruction

1. start new feature branch with `feat-` prefix. <br>
   example: `feat-authentication`, `feat-dashboard`
2. Create pull request on `dev` branch only.

## Resources

## others

extensions to use

1. [code spell check ](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
2. [prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)