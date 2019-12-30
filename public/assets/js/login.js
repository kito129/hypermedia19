
$( "form" ).submit(function( event ) {
    var dataFrom = $( this ).serializeArray();
    event.preventDefault();
    var user = dataFrom[0].value;
    var pass = dataFrom[1].value;

    $.ajax({
        url : "https://hypermedia19.herokuapp.com/user/login",
        type: "POST",
        data: JSON.stringify(
            {
                email: user,
                password: pass
            }
        ),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(data,status,xrh){
            var res = JSON.parse(data);
            localStorage.clear();
            localStorage.setItem('token', "bearer: " + res.token);
            localStorage.setItem('userId', res.userId);
            localStorage.setItem('name', res.userName);
            localStorage.setItem('surname', res.userSurname);
            $("#respLogin").empty();
            $("#respLogin").append(
                `
                <h4 class="text-center mt-4 mb-4">Logged in.</h4>
                `
            );
        
        },
        error       : function (err) {
            if(err.status==401){
                console.log("Auth failed");
                $("#respLogin").empty();
                $("#respLogin").append(
                    `
                    <h4 class="text-center mt-4 mb-4">Email or password are wrong.</h4>
                    `
                );
                
            }
        }
    });

    

  });