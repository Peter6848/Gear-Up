// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  pinterestLogin();
  pinsHoverListener();
})

var pinsHoverListener = function() {
  $('.my-3').on('click', function(){
    var clicked = $(this).closest('.board-items');
    var board_opacity = $('.board-items').css('opacity');
    console.log(board_opacity)

    if($(clicked).hasClass('clicked')){
      $('.board-items').fadeIn();
      $(clicked).removeClass('clicked');
    } else {
      $(clicked).addClass('clicked');
      $('.board-items').fadeOut();
      $('.clicked').fadeIn();
    }
  });
}

var pinterestLogin = function(){
  $('.pinterest-login').click(pintrest)
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
      console.log("Response:", response);

      PDK.me("pins", function(response){
        console.log("pdk.me:", response)
      })
      PDK.request('/v1/me/', function (response) {
        if (!response || response.error) {
          alert('Error occurred');
        } else {
          var boardItem = "";
          console.log(response.data);

          $.ajax({
            url:  "https://api.pinterest.com/v1/me/boards/?access_token="+PDK.getSession().accessToken+"&fields=id,name,url,description,image"
          }).done(function(response){
            response.data.forEach(function(board){

              var id = board.id;
              var name = board.name;
              var url = board.url;
              var description = board.description;
              var image = board.image["60x60"].url;
              console.log(id);
              console.log(name);
              console.log(url);
              console.log(description);
              console.log(image);
              var boardItem = boardItem + "<div class='bg-light text-center mr-md-3 board-items pt-3 px-3 pt-md-5 px-md-5 text-centers'>"
                                          + "<div class='my-3 p-3'>"
                                            + "<h2 class='display-5'>" + name + "</h2>"
                                            + "<p class='lead'>" + description + "</p>"
                                          + "</div>"
                                          + "<div class='image-div' style='width: 80%; height: 300px; border-radius: 21px 21px 0 0;'>"
                                            + "<img class='board-image' src='" + image + "'/>"
                                          + "</div>"
                                        + "</div>";
              $('.my-md-3').append(boardItem);
              // <div class="bg-light text-center mr-md-3 board-items pt-3 px-3 pt-md-5 px-md-5 text-centers">
              //   <div class="my-3 p-3">
              //     <h2 class="display-5">Another headline</h2>
              //     <p class="lead">And an even wittier subheading.</p>
              //   </div>
              //   <div class="image-div" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
              // </div>
            })
            console.log(response.data)
            // $('.image-div').prepend('<img class="board-image" src=' + response.data[0].image.url + ' />')
          }).fail(function(error){
            console.log(error)
          })
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
