const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const csvURL = "http://data.montgomerycountymd.gov/api/views/4mse-ku6q/rows.csv";

app.use(bodyParser.urlencoded({extended: true}));
app.get("/api/listViolations/:range", function (req, res) {
    var rangeString = req.params.range.split("-");
    var lowerRange = parseInt(rangeString[0]);
    var upperRange = parseInt(rangeString[1]);

    if(lowerRange > upperRange || lowerRange < 0 || upperRange > allEntries.length){
        res.status = 400;
        res.send();
        return;
    }
    console.log("serving request for " + lowerRange + " to " + upperRange);
    
    res.send(allEntries.slice(lowerRange, upperRange));
});
app.post("/api/searchViolations", function (req, res) {

    //i have no idea why I have to rig it up this way...
    //for some reason, the json object i send from the client is being placed as the only key in an object, so I have to pull it out like this.
    var jsonContent = Object.keys(req.body)[0];
    var settings = JSON.parse(jsonContent);

    var results = [];
    var template = settings.template;
    var page = settings.page;
    var entry;
    var counter = 0;
    var skippedEntries = 0; // used for pagination
    while(results.length < settings.resultCount && counter < allEntries.length){
        entry = allEntries[counter++];
        var entryMatches = true;
        for(var property in template){
            var templateValue = template[property];
            var entryValue = entry[property];



            if(template[property] == null){
                continue;
            } else {
                //this could be better changed to accept regex strings probably.
                if(typeof entryValue == "string" && entryValue.toUpperCase().includes(templateValue.toUpperCase())){
                    continue;
                }
                if(typeof entryValue == "number" && entryValue == parseInt(templateValue)){
                    continue;
                }
                entryMatches = false;
            }
        }
        if(entryMatches){
            //check to see if we skip it because of pagination
            if(skippedEntries < page * settings.resultCount){
                skippedEntries += 1;
                continue;
            }


            results.push(entry);
        }
    }
    console.log(results.length + " results found");
    res.send(results);
});
app.get("/*", function (req, res) {
    console.log("404 page requested...");
    console.log(req.originalUrl);
});
app.listen(8000, () => {
    console.log('server started');
});
var allEntries  = [];

const request=require('request')
const csv=require('csvtojson')
console.log("Fetching csv database directly from source. It may take a while to load all 1.5 million entries...")
csv()
.fromStream(request.get(csvURL))
.subscribe((json)=>{
    return new Promise((resolve,reject)=>{
        // long operation for each json e.g. transform / write into database.
        allEntries.push(json);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("" + allEntries.length);

        
        
         // end the line
        
        resolve();
    })
},function(err){
    console.log("something went wrong")
    console.log(err);
},function(data){
    console.log(" entries loaded");
    console.log(allEntries);
});