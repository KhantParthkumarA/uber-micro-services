const apikey = ""

// doc - https://developers.google.com/maps/documentation



// direction
// guide doc - https://developers.google.com/maps/documentation/directions/get-directions
const directionsApiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=${apikey}`
const dirctionApiViaUrl = `https://maps.googleapis.com/maps/api/directions/json?
origin=Boston,MA&destination=Concord,MA
&waypoints=Charlestown,MA|via:Lexington,MA`


// distance api doc
// guide doc - https://developers.google.com/maps/documentation/distance-matrix/distance-matrix


// road map guide 
// https://developers.google.com/maps/documentation/roads/snap
