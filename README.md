# Babydue
Simple web application to bet about the date and gender of your forthcoming baby!

Each email is signed and allowed to place a bet on a date/gender pair. There is a unique bet allowed by each date/gender.


## Backend API
Made in nodejs/express.
There is middleware to ensure that our API responds only to a valid key of email/signature.
So email and signature MUST always be sent in GET along with the other parameters.

### Methods
#### GET /bets/
Retrieve a map date/bets of the current placed bets

#### POST /bets/
Place a bet, if no other bet is in the way
Params:
- email (aaa@bbb.com)
- date (2016-01-01)
- gender ("m", "f", "d" -> as male, female or dragon ;))

## Frontend
TODO

