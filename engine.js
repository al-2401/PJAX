function swapContent(href, url_data, target) {
    $.ajax({
        type: 'GET',
        cache: false,
        url: href+'?' + url_data,  //add a variable to the URL that will carry the value in your i counter through to the PHP page so it know's if this is new or additional data
        success: function (data) { // this param name was confusing, I have changed it to the "normal" name to make it clear that it contains the data returned from the request
            //load more data to "target" value div
            target.innerHTML = (data); // as above, data holds the result of the request, so all the data returned from your results.php file are in this param but please see below
        }
            .done(function( msg ) {
                //javascript view rendering functions here
                dialog();//testing line
            })
            .fail(function() {
        //error processing
        pjax_e++;
        if(pjax_e < 10) {
            //could be an internal server error
            $('#'+target).text("error " + pjax_e);
            setTimeout(recurse, 500);
        }
        else {
            //something seriously is wrong, lets reload
            window.location = '#?'+url_data;
        }

    })
        .always(function() {
            //url goes in here
            window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", '#?'+url_data);
        });
})
}

//testing
i=0;
function dialog(){
    i++;
    console.log(i);
}
//end of testing
