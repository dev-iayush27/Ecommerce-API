# Ecommerce-API
>Backend RESTful API for Ecommerce build in Node.js using Express.js & MongoDB

## Install all Dependencies
ruby```
npm i
```
## config.env
>Create config.env file inside root folder. Add environment variable values.
```
PORT =
NODE_ENV =
DB_URI = 

JWT_SECRET =
JWT_EXPIRES_TIME =
COOKIE_EXPIRES_TIME =

CLOUDINARY_CLOUD_NAME =
CLOUDINARY_API_KEY =
CLOUDINARY_API_SECRET =

STRIPE_SECRET_KEY =
STRIPE_API_KEY =

SMTP_HOST =
SMTP_PORT =
SMTP_EMAIL =
SMTP_PASSWORD =
SMTP_FROM_EMAIL =
SMTP_FROM_NAME =
```
## Run Project using any one of below commands
```
npm start | npm run dev | npm run prod
```
## Install MongoDB Community Edition
>Install MongoDB Community Edition on macOS using below commands on terminal. For more information, you can checkout this [link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/). 
```ruby
brew tap mongodb/brew
```
```
brew install mongodb-community@5.0
```
