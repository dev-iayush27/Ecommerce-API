# Ecommerce-API
>Backend RESTful API for Ecommerce build in Node.js using Express.js & MongoDB

### Install all Dependencies
```ruby
npm i
```
### config.env
>Create config.env file inside root folder. Add environment variable values.
```
PORT = <It may be any port number like 3000, 4000 etc>
NODE_ENV = <It may be DEVELOPMENT or PRODUCTION>
DB_URI = <A link to connect your application to your cluster. You can get this from [here](https://cloud.mongodb.com/)>

JWT_SECRET = <secret or publicKey (strong and random alphanumeric string)>
JWT_EXPIRES_TIME = <It may be any time/day like 7d, 10d etc>
COOKIE_EXPIRES_TIME = <It may be 7, 10 etc>

CLOUDINARY_CLOUD_NAME = <It should be your cloudinary cloud name>
CLOUDINARY_API_KEY = <It should be your cloudinary api key>
CLOUDINARY_API_SECRET = <It should be your cloudinary api secret>

STRIPE_SECRET_KEY = <It should be your stripe secret key>
STRIPE_API_KEY = <It should be your stripe api key>

SMTP_HOST = <It should be your SMTP host (Get it from https://mailtrap.io/)>
SMTP_PORT = <It should be your SMTP port>
SMTP_EMAIL = <It should be your SMTP email>
SMTP_PASSWORD = <It should be your SMTP password>
SMTP_FROM_EMAIL = <It should be your email id from which you will send mail via SMTP>
SMTP_FROM_NAME = <It should be any name from which you will send mail via SMTP>
```
### Run Project using any one of below commands
```ruby
npm start
```
```ruby
npm run dev
```
```ruby
npm run prod
```
### Install MongoDB Community Edition
>Install MongoDB Community Edition on macOS using below commands on terminal. For more information, you can checkout this [link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/). (For different OS like Windows, Linux follow this [link](https://docs.mongodb.com/manual/administration/install-community/).)
```ruby
brew tap mongodb/brew
```
```ruby
brew install mongodb-community@5.0
```
- Setup cloud MongoDB Atlas using this [link](https://account.mongodb.com/).
- Register, create project, create database and do some settings like Database Access, Network Access etc.
- Connect to database cluster. (If you want you can connect database with [MongoDB compass](https://www.mongodb.com/products/compass)(GUI for MongoDB) on your Macbook after installing the MongoDB Compass.)
