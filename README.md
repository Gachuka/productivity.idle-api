# Productivity.Idle-api

PLEASE READ [Productivity.Idle](https://github.com/Gachuka/productivity.idle) FIRST BEFORE USING THIS REPOSITORY

This repository contains the API used for [Productivity.Idle](https://github.com/Gachuka/productivity.idle)

# Build
This is a RESTful API built in [Express](https://expressjs.com/) framework in [Node.js](https://nodejs.org/en/).

# Getting Started

##  Development Environment (Local)

### System Requirements

Before you begin, make sure you have all the below installed:
- [Node.js v16 or above](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Using Database for data storage

1. Install packages `npm install`

2. Copy .env.example to .env `cp .env.example .env` and fill in port different from your database post and database credentials as needed

3. PORT number used by the Chrome Extension to communicate with this API is **7878** by default

4. Create a database with the same name as in .env's DB_DATABASE

5. Run migrations `npm run migrate`

6. Run seeds `npm run seed`

7. Start server `npm run dev`

##  Available Endpoints

- `GET /`

Response:
```
{
  text_typed
  character_count
  character_left
  upgrade_1
  upgrade_2
  upgrade_3
  add_per_input
}
```

- ``PUT /``

Body: Object can be empty or a combination of one or more of these fields.

```
{
  text_typed
  character_count
  upgrade_1
  upgrade_2
  upgrade_3
}
```
Response:
```
{
	message: "Game Saved"
}
```

# Lessons Learned
Most calculation should be done on the server side so that the server remains the single source of truth. 

Having everything as a formula and not just functions makes calculations faster and less of a hassle to read.

# Next Steps

Improve cost per upgrade formula so the game does not feel to drag on at times.

Adding math formula to implement a prestige system to progress even further at a faster pace.
