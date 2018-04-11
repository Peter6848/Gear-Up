// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  pinterestLogin();
  boardsListener();
})

var boardsListener = function() {
  $('.boards-container').on('click', '.board-items', function(){
    var clicked = $(this).closest('.board-items');
    var board_opacity = $('.board-items').css('opacity');

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
  $('.pinterest-login').click(pinterest)
}

function pinterest(){
  window.pAsyncInit = function() {
      PDK.init({
          appId: "4959715914598591625",
          cookie: true
      });
      //login
      PDK.login({ scope : 'read_relationships,read_public' }, function(response){
          if (!response || response.error) {
             // alert('Error occurred');
          } else {
             console.log('You are now logged in to your Pinterest account!');
          }
      // PDK.me("pins", function(response){
      //   console.log("pdk.me pins:", response)
      //
      // })



      //BOARDS REQUEST
      PDK.request('/v1/me/', function (response) {
        if (!response || response.error) {
          // alert('Error occurred');
        } else {
          var boardItem = "";
          // console.log(response.data);

          $.ajax({
            url:  "https://api.pinterest.com/v1/me/boards/?access_token="+PDK.getSession().accessToken+"&fields=id,name,url,description,image"
          }).done(function(response){
            response.data.forEach(function(board){

              var id = board.id;
              var name = board.name;
              var url = board.url;
              var description = board.description;
              var image = board.image["60x60"].url;
              var boardDiv = document.getElementsByClassName('my-md-3')
              // console.log(boardDiv.childNodes.count)
              boardItem = "<div id='" + id + "' class='bg-light text-center mr-md-3 board-items pt-3 px-3 pt-md-5 px-md-5 text-centers'>"
                                          + "<div class='my-3 p-3'>"
                                            + "<h2 class='display-5'>" + name + "</h2>"
                                            + "<p>Total price for this board: $</p>"
                                            + "<p class='lead'>" + description + "</p>"
                                          + "</div>"
                                        + "</div>";

              if(boardDiv.childElementCount < 2) {
                $('.my-md-3').append(boardItem);
              } else {
                $('.boards-container').append("<div class='d-md-flex flex-md-equal w-100 my-md-3 pl-md-3'></div>").append(boardItem);
              }

            });
          }).fail(function(error){
            console.log(error)
          });
          // PDK.logout();
        }
      });

      //PINS REQUEST
      // PDK.request('/v1/me/', function (response) {
      //   if (!response || response.error) {
      //     // alert('Error occured');
      //   } else {
      //     var total = 0;
      //     var totalPrices = "";
      //
      //     $.ajax({
      //       url: "https://api.pinterest.com/v1/me/pins/?access_token="+PDK.getSession().accessToken+"&fields=id,link,board,image,metadata"
      //     }).done(function(response){
      //       response.data.forEach(function(pin){
      //         // console.log(pin);
      //         var id = pin.id;
      //         var link = pin.link;
      //         var board = pin.board.id;
      //         var image = pin.image.original.url;
      //         var boardId = document.getElementById(board);
      //
      //         if(board == boardId.id){
      //           $(boardId).append("<img src='" + image + "' height=90px width=90px />");
      //         }
      //
      //         try {
      //           if(pin.metadata.product.offer.price) {
      //             var price = parseFloat(pin.metadata.product.offer.price.replace(/\$|,/g, ''));
      //             total += price
      //           }
      //         }
      //         catch(err) {
      //           // alert(err);
      //         }
      //       });
      //       console.log(total);
      //       totalPrices = "<div class='total-prices'>$" + total + "</div>"
      //       $('.m-md-3').append(totalPrices);
      //     });
      //
      //   }
      // });
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
