// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  pinterestLogin();
})

var pinterestLogin = function(){
  $('.login-button').click(pintrest)
}

function pintrest(){
        window.pAsyncInit = function() {
            PDK.init({
                appId: "4959715914598591625",
                cookie: true
            });
            //login
            PDK.login({ scope : 'read_relationships,read_public' }, function(response){
                if (!response || response.error) {
                  //  alert('Error occurred');
                } else {
                   //console.log(JSON.stringify(response));
                }
            //get board info

            var pins = [];

            PDK.request('/v1/me/', function (response) {
              if (!response || response.error) {
                //alert('Error occurred');
              } else {
              	// console.log(JSON.stringify(response));
                  //  alert('success');
                    // console.log(PDK.getSession().accessToken);

                    var yahoo = $( "#result" ).load( "https://api.pinterest.com/v1/me/?access_token="+PDK.getSession().accessToken+"&fields=counts" );
                    

                    // var board = yahoo['counts']['boards'];
                    // $('.board').append(board);
                    // PDK.logout();
              }
            });

            //end get board info
            });

            //end login
        };

        (function(d, s, id){
            var js, pjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//assets.pinterest.com/sdk/sdk.js";
            pjs.parentNode.insertBefore(js, pjs);
        }(document, 'script', 'pinterest-jssdk'));

      }
