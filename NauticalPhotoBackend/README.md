

## Node Server -> MongoDB + GCP
GCP credentials and MongoDB credentials available upon request: please email eric dot jkogut at gmail.

### Note
[The server](http://backend-dot-nautical-photo.uc.r.appspot.com/) may need a minute to spinnup at first. Refresh the page if it doesn't work.
This server was extended from [my own](https://github.com/EricKogut/ts-node-express-server-boilerplate) repo to fit the purposes of this project.
It uses a GCP cloud storage to store the images sent by the users, and MongoDB as the database to store the user and photo documents.
On the auth side, it uses public/private key encryption, generated via [pkcs1](https://en.wikipedia.org/wiki/PKCS_1). 
User password is salted, also to be stored on the client and decrypted on the server. See utils folder for complete list of auth functions. 




#### Q:  How do I work this thing?
    
  [npm](https://www.npmjs.com/) install, [npm](https://www.npmjs.com/) run hireEric OR ts-node server.ts
  
  Main user routes:

|                |Route                          |Parameters passed                         |
|----------------|-------------------------------|-----------------------------|
| For login|`localhost:5000/user/login`            | body:{username:, password:}           |
|For signup          |`localhost:5000/user/register`            |body:{username:, email:, password:}         |
|For checking token          |`localhost:5000/user/authorized`|header:{Authorization:"token STRING returned from login"}|

---

#### Q:  How is this server structured? How do I add routes etc.?

 1. The server runs and imports the routes on a per route basis from server.ts:

    
```typescript
ie. 
import { userRouter } from "./routes/user.routes";
        app.use("/user", userRouter());
 ```
      
 2. Each route file then receives the request, which is then forwarded to the according handler. The initial router expects a promise to be returned.
 ie. Building off of the previous example, "user.handler.ts" would be the handler.

 3. Depending on the case, the handler then either resolves or rejects the request, which then is handled back on the router side. 

 The minimum recommendation is to at least create a new route file for each new collection.
 
---
#### Q:  Why ts and not js?

 Because we <3 strongly typed code. Although, there are some definite ts irregularities in the code and I shouldn't be using the "any" type in the handlers.

---

#### Q:  How does the Authentication work, particularily with this server?

  The application makes use of [JSON Web Tokens](https://jwt.io/) in its current state to authenticate the user. 
    [Passport](http://www.passportjs.org/) is used as the middleware to handle the different possible Auth strategies available to a developer, to ensure a user has access to a resource. The simplest way to see the start of the flow can be seen in the following route:
   ```typescript
        router.get(
        "/authorized",
        passport.authenticate("jwt", { session: false }),
        (req: Request, res: Response) => {
          return res.status(200).json({ response: "You are authenticated :)" });
        }
        );
   ```
---
As we can see, before the router gets to the handling of the request, it first calls passport.authenticate to ensure that the request is valid. If the bearer token is valid, it would then respond with a status code of 200.
   See [this route](http://backend-dot-nautical-photo.uc.r.appspot.com/user/protected) to see what happens when you are not authenticated.

#### Q: What does it mean when a user "Logs in" and how do we ensure this user is authenticated for future requests?

  1. Logins generate a JWT token, assuming the password and user combo are correct
  2. The user then stores this token on the client side, whichever way is most convenient. Also note: password is also sent to user in its salted form. See /photo/get/private to see how it is laster used.  
  3. Every http request that requires authentication, attach the JWT token to the header ('Authorization' parameter)
  4. Server receives request, and verifies the signature of the request
  5. If the signature is valid, the server decodes the token and retrieves the data

    *Note*: JWT is stateless, which is why we attach it to every request. 

---

#### Q:  Why is there a passport file, I'm confused, I thought we were just using the library?
    
We import the library, and use it for the created instance of the custom passport function.
   When we pass passport.auth, it calls the verify callback in the passport config (again, its used as middleware).

---
#### Q:  How do I make this server more secure?
    
Well changing/creating your own public and private key are a good start (you can do that with this server - /utils/authUtils/genKeyPair.js). Also, you probably don't want to store it here like I did. OAuth and the use of federated providers would probably be your next step.
   
   ---
