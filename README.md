# Nakama-Starting-Server

The Nakama Server to run the [Networked Pong Prototype](https://github.com/FinlayMac/Networked-Pong). 
 
It is a mostly unmodified server following the guide at: https://heroiclabs.com/docs/nakama/getting-started/install/docker/
 
## Prerequisites:

- Docker: https://www.docker.com/
  - Check Installation with `docker --version`
- Node.JS: https://nodejs.org/en/
  - Check Installation with `node -v`

## Setup:
 
Assuming the repo has been cloned / extracted to a suitable location: 
  
Navigate inside the folder using terminal.
 
Install the node dependencies using: `npm install`
![image](https://user-images.githubusercontent.com/34044928/223003035-2d67f22c-9415-4041-9e66-11ad4016b5e7.png)



## Running the Server:
 
Make sure you have Docker running.
 
Inside the cloned folder, using a terminal run: `docker-compose up --build nakama`

Navigate to: `localhost:7351`
 
Default login information is: username, password


## Updating the Server:

To update the server logic (new RPCs etc) run:  `docker-compose up -d --build nakama`


## Stopping the Server:

To stop the server run:  `docker compose stop`