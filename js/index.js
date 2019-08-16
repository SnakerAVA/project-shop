function isEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

var erdiv = $("#error");
var btnwrap = $("#btnwrap");
var emailval;
function completeInviteForm() {
    fetch('subscibe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientEmail: emailval
        })
    }).then(()=>{
        $("#inviteform").remove()
        erdiv.html("Ви підписалися на нашу розсилку.");
    })
}

$(document).ready(function() {
    $("#sendbtn").live("click", function(e) {
        e.preventDefault();
        emailval = $("#email").val();

        if (!isEmail(emailval)) {
            erdiv.html("Невірна адреса електронної пошти");
            erdiv.css("display", "block");
        }
        if (isEmail(emailval)) {
            $("#sendbtn").remove()
            $("#email").remove()
            erdiv.html("Обробка...");
            $("#inviteform").append('<img src="img/loader.gif" alt="loading">')
            setTimeout(completeInviteForm, 2000);
        }

    });

});


const cart = new Cart($('#cartModal'));
const productList = new ProductList(
  'products.json',
  $('.products-container'),
  cart
);
