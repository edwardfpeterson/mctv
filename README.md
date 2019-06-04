# Choptank Transport Interview Project

This project visualizes a database of all traffic violations in Montgomery County Maryland from the past 7 years. Built using Angular 8.0.0. The data set used for this is roughly 1.5 million entries. 

## Dependencies
This project requires the installation of Node.js and Angular CLI.
The only Node dependency that needs to be installed is Express for API serving on the backend. It can be installed with 
```
npm install express -save
```
Other technologies this project leverages include
* Angular Google Maps
* CSVtoJSON
* Request
* Body-parser
## Deployment
### Node backend
First, run the node backend with 
```
node --max-old-space-size=8192 server.js
```
Once the server starts downloading the entries of the dataset, it can begin being accessed. The entire dataset doesn't need to be loaded for it to work. It will just work based off of what its got at the moment.
This will start the backend and the process of downloading the CSV data from its original source.
### Angular client server
Run
```
ng serve -o --proxy-config proxy.conf.json
```
for a dev server. The proxy config is required to access the API of the node backend.

## Funcionalities

Clicking on any marker on the map view will highlight and automatically scroll to the violation in the table view.\n

### Search function

The search section on the righthand side of the screen can be used to find entries based on any of the text entered into any of the fields of the Search panel.
Use the Update Results button to perform the search and the Clear Inputs button to clear all the input fields in the Search panel.
Above the Update Results button shows the page number of the shown results along with next and previous arrows to change pages.
You can change the number of results per page with the field in the very bottom of the Search panel. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Author
* **Edward Peterson**
### Data source

Data comes from [here](http://data.montgomerycountymd.gov/api/views/4mse-ku6q/rows.csv). Originally found from this [link](https://catalog.data.gov/dataset/traffic-violations-56dda).

