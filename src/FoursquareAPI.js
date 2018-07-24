const client_id = "UISD4REMOZSQ2J5NJAXNQFUXNNNN121QPQ5XVC1AGKWXMMVB";
const client_secret = "4FEOXYFGY0F0ASIPCTOVAPBSIJ44OO5JOYQFJYRGSQ2RUI0P";


export const getVenueDetails = (venue) =>
    fetch(`https://api.foursquare.com/v2/venues/${venue}?client_id=${client_id}&client_secret=${client_secret}&v=20180407`, {
        headers: {}
    })
    .then(response => response.json())
    .then(r => r)


export const getVenueLists = (venue) =>
    fetch(`https://api.foursquare.com/v2/venues/${venue}/listed?client_id=${client_id}&client_secret=${client_secret}&v=20180407`, {
        headers: {}
    })
    .then(response => response.json())
    .then(r => r)
