# Choptank Transport Interview Project

This project visualizes a database of all traffic violations in Montgomery County Maryland from the past 7 years. Built using Angular 8.0.0. 

## Dependencies
This project requires the installation of Node.js and Angular CLI.
The only Node dependency that needs to be installed is Express for API serving on the backend. It can be installed with 
```
npm install express -save
```
## Development server
First, run the node backend with 
```
node --max-old-space-size=8192 server.js
```
This will start the backend and the process of downloading the CSV data from its original source.
Run
```
ng serve -o --proxy-config proxy.conf.json
```
for a dev server. The proxy config is required to access the API of the node backend.

## Funcionalities



## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Data source

Data comes from [here](http://data.montgomerycountymd.gov/api/views/4mse-ku6q/rows.csv). Originally found from this [link](https://catalog.data.gov/dataset/traffic-violations-56dda).

