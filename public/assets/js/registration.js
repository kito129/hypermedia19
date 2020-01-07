
$( "form" ).submit(function( event ) {
    var dataFrom = $( this ).serializeArray();
    event.preventDefault();
    
    var name = dataFrom[0].value;
    var surname = dataFrom[1].value;
    var user = dataFrom[2].value;
    var pass = dataFrom[3].value;

    $.ajax({
        url : "https://http://hypermedia19.herokuapp.com/user/signup",
        type: "POST",
        data: JSON.stringify(
            {
                name: name,
                surname: surname,
                email: user,
                password: pass
            }
        ),
        contentType: "application/json; carset=utf-8",
        dataType   : "json",
        success    : function(data,status,xrh){
            $("#respReg").empty();
            $("#respReg").append(
                `
                <h4 class="text-center mt-4 mb-4">Registered.</h4>
                `
            );
        
        },
        error       : function (err) {
            console.log(err);
            if(err.status==409){
                console.log("Email already exist");
                $("#respReg").empty();
                $("#respReg").append(
                    `
                    <h4 class="text-center mt-4 mb-4">Email already exist.</h4>
                    `
                );
                
            } else if (err.status==500){
                console.log("Registration failed.. try again later");
                $("#respReg").empty();
                $("#respReg").append(
                    `
                    <h4 class="text-center mt-4 mb-4">Registration failed.. try again later".</h4>
                    `
                );
            }
        }
    });
  });