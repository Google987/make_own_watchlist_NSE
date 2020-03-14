function add_a_share(){
    var code = $('input').val().trim()
    if(code){
        $.get("/add",{
            code: code
        })
        .done(function(data) {
            if(data != 'error')
                refresh_all_row(data);
            else alert("not valid OR already in the list");
        })
        .fail(function(e){
            console.log(e);
        })
    }else{
        alert("enter something first");
    }
}

function refresh_all_row(allQuotes) {
    // console.log(allQuotes);
    allQuotes.forEach(data => {
        if($("#"+data.symbol).text())
            $("#"+data.symbol).html(data.companyName+` - &#8377; `+ data.lastPrice)
        else 
            $('#main').append(`<h1 id="`+data.symbol+`">`+data.companyName+` - &#8377; `+ data.lastPrice+`</h1>`);
    });
}

function refresh(){
    $.get("/refresh",{})
    .done(function(data) {
        refresh_all_row(data);
    })
    .fail(function(e){
        console.log(e);
    })
}

setInterval(refresh, 1500)
