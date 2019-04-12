var eventKey = 'ZAZTJGCB3OHOQ3RBOEAC';
var eventAddress = $('#exampleFormControlInput1').val();
var eventUrl = 'https://www.eventbriteapi.com/v3/subcategories/?token=' + eventKey + '&id=103&location.address=' + eventAddress;

$(document).ready(function() {
    $.ajax({
        url: eventUrl,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(response.subcategories[0]);
        for (let i = 0; i < response.subcategories.length; i++) {
            if(response.subcategories[i].parent_category.id==103)
            console.log(response.subcategories[i].name + " " + response.subcategories[i].id);  
        }
    });
}); 

