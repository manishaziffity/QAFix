$(document).ready(function () {

  $("#btn-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    let email = $('input[type="text"]').val().toLowerCase();
    let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      getEmailData(email);
    } else {
      document.querySelector('input[type="text"]').parentNode.classList.add("error");
    }
  });

  $("#btn-search-phone").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    let phoneNumber = $('input[name="phone_number"]').val();
    if (phoneNumber != '' && phoneNumber.length == 10) {
      getMobileData(phoneNumber);
    } else {
      document.querySelector('input[name="phone_number"]').parentNode.classList.add("error-phone");
    }

  });
  $('input[type="text"]').keypress(function (event) {
    let email = $('input[type="text"]').val().toLowerCase();
    let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      event.preventDefault();
      localStorage.clear();
      if (email.match(regEx)) {
        getEmailData(email);
      } else {
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
    }
  });

  $('input[name="phone_number"]').keypress(function (event) {
    let phoneNumber = $('input[name="phone_number"]').val();
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      event.preventDefault();
      localStorage.clear();
      if (phoneNumber != '' && phoneNumber.length == 10) {
        getMobileData(phoneNumber);
      } else {
        document.querySelector('input[name="phone_number"]').parentNode.classList.add("error-phone");
      }
    }
  });

  $(".change-tab").click(function () {
    $('.change-tab').removeClass('tab-button-active');
    $(this).addClass("tab-button-active");
    $('.change-tab').parent().removeClass('tab-active');
    $(this).parent().addClass("tab-active");
    if ($(this).val() != 'email') {
      $(".phone-section").show();
      $(".email-section").hide();
    } else {
      $(".email-section").show();
      $(".phone-section").hide();
    }
  });

});

function getEmailData(email) {
  $(".hide-content").hide();
  $(".loader").show();
  document.querySelector('input[type="text"]').parentNode.classList.remove("error");
  const proxyurl = "";
  const url =
    'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
  fetch(proxyurl + url)
    .then((response) => response.text())
    .then(function (contents) {
      localStorage.setItem("userObject", contents);
      setTimeout(function () {
        window.location.href = "result.html";
      }, 1000);
    })
    .catch((e) => console.log(e));
}

function getMobileData(phoneNumber) {
  document.querySelector('input[name="phone_number"]').parentNode.classList.remove("error-phone");
  $(".hide-content").hide();
  $(".loader").show();
  const proxyurl = "";
  const url =
    'https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=' + phoneNumber;
  fetch(proxyurl + url)
    .then((response) => response.text())
    .then(function (contents) {
      localStorage.setItem("userObject", contents);
      setTimeout(function () {
        window.location.href = "result.html";
      }, 1000);
    })
    .catch((e) => console.log(e));
}