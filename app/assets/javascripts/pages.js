// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  pinterestLogin();
  boardsListener();
})

var boardsListener = function() {
  $('.boards-container').on('click', '.board-items', function(){
    var clicked = $(this).closest('.board-items');

    if($(clicked).hasClass('clicked')) {
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
  $('.pinterest-login').click(pinterest)
}

function pinterest(){
  window.pAsyncInit = function() {
      PDK.init({
          appId: "4959715914598591625",
          cookie: true
      });
      //LOGIN
      PDK.login({ scope : 'read_relationships,read_public' }, function(response){
          if(!response || response.error) {
             // alert('Error occurred');
          } else {
             $('.pinterest-login').replaceWith('<a class=" pinterest-logout btn btn-outline-secondary" href="#">Logout Of Your Pinterest Account!</a>');
             console.log('You are now logged in to your Pinterest account!');
          }

      //BOARDS REQUEST
      PDK.request('/v1/me/', function (response) {
        if(!response || response.error) {
          // alert('Error occurred');
        } else {
          var boardItem = "";

          $.ajax({
            url:  "https://api.pinterest.com/v1/me/boards/?access_token="+PDK.getSession().accessToken+"&fields=id,name,url,description,image"
          }).done(function(response){
            response.data.forEach(function(board){

              var id = board.id;
              var name = board.name;
              var url = board.url;
              var description = board.description;
              var image = board.image["60x60"].url;
              var boardDiv = document.getElementsByClassName('my-md-3');
              var boardTotal = 0;

              boardItem = "<div id='" + id + "' class='bg-light text-center mr-md-3 board-items pt-3 px-3 pt-md-5 px-md-5 text-centers'>"
                                          + "<div class='my-3 p-3'>"
                                            + "<h2 class='display-5'>" + name + "</h2>"
                                            + "<p class='board-total'>Total price for this board: $" + boardTotal + "</p>"
                                            + "<p class='lead'>" + description + "</p>"
                                          + "</div>"
                                        + "</div>";

              // if(boardDiv.childElementCount < 2) {
                $('.my-md-3').append(boardItem);
              // } else {
              //   $('.boards-container').append("<div class='d-md-flex flex-md-equal w-100 my-md-3 pl-md-3'></div>").append(boardItem);
              // }

            });
          }).fail(function(error){
            console.log(error)
          });

        }
      });

      // PINS REQUEST
      PDK.request('/v1/me/', function (response) {
        if(!response || response.error) {
          // alert('Error occured');
        } else {
          // var total = 0;
          var totalPrices = "";

          $.ajax({
            url: "https://api.pinterest.com/v1/me/pins/?access_token="+PDK.getSession().accessToken+"&fields=id,link,board,image,metadata"
          }).done(function(response){
            var total = 0;
            response.data.forEach(function(pin){
              // console.log(pin);
              var id = pin.id;
              var link = pin.link;
              var board = pin.board.id;
              var image = pin.image.original.url;
              var boardId = document.getElementById(board);


              if(board == boardId.id){
                $(boardId).append("<img src='" + image + "' height=90px width=90px />");

                try {
                  if(pin.metadata.product.offer.price) {
                    var price = parseFloat(pin.metadata.product.offer.price.replace(/\$|,/g, ''));
                    // boardTotal += price
                    $('.board-total').text(boardTotal += price);
                  }
                }
                catch(err) {
                  // alert(err);
                }
              }

            });
            console.log(total);
            // totalPrices = "<div class='total-prices'>$" + total + "</div>"
            // $('.board-total').append(totalPrices);
          });
            $('.pinterest-logout').on('click', function(){
              PDK.logout();
              $('.pinterest-logout').replaceWith('<a class=" pinterest-login btn btn-outline-secondary" href="#">Logoin To Your Pinterest Account!</a>');
              alert('You are now logged out of Pinterest!');
            })
        }
      });
    });
  };

  (function(d, s, id){
      var js, pjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//assets.pinterest.com/sdk/sdk.js";
      pjs.parentNode.insertBefore(js, pjs);
  }(document, 'script', 'pinterest-jssdk'));

}
