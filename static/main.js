function add_a_share(){
    var code = $('input').val().trim().toUpperCase();
    if(code){
        $.get("/add",{
            code: code
        })
        .done(function(data) {
            if(data != 'error'){
                refresh_all_row(data);
                $('input').val("");
            }
            else alert("not valid OR already in the list");
        })
        .fail(function(e){
            console.log(e);
        })
    }else{
        alert("enter something first");
    }
}

function delete_a_share(btn){
    shareName = btn.attr('name').toUpperCase();
    btn.parent().remove();
    // console.log(shareName);
    $.get("/delete",{
        code: shareName
    })
    .done(function(data) {
        // console.log(data);
    })
    .fail(function(e){
        console.log(e);
    })
}

function refresh_all_row(allQuotes) {
    // console.log(allQuotes);
    allQuotes.forEach(data => {
        if($("#"+data.symbol).text())
            $("#"+data.symbol).html(data.companyName+` - &#8377; `+ data.lastPrice)
        else {
            $('#main').append(`
                <div style="display: flex;">
                    <h3 id="`+data.symbol+`">`+data.companyName+` - &#8377; `+ data.lastPrice+`</h3>
                    <button class="delete" onclick="delete_a_share($(this))" name="`+data.symbol+`">Delete</button>
                </div>
            `);
        }
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
