const apikey = ""
const directionsApiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=${apikey}`
const dirctionApiViaUrl = `https://maps.googleapis.com/maps/api/directions/json?
origin=Boston,MA&destination=Concord,MA
&waypoints=Charlestown,MA|via:Lexington,MA`