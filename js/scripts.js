// Business Logic
var totalPriceArray = []; //Only global variable in code
function Order (customSize, crust) {
  this.customSize = customSize;
  this.sauce = 00;
  this.crust = crust;
  this.toppings1 = 0;
  this.toppings2 = 0;
  this.toppings3 = 0;
  this.pizzaPrice = 0;
  this.deliveryFee = 0;
}
Order.prototype.pizzaCost = function () {
  if (this.customSize === "small-6") {
    this.pizzaPrice += 450;
  } else if (this.customSize === "small-4") {
    this.pizzaPrice += 450;
    }else if (this.customSize === "medium-12") {
    this.pizzaPrice += 650;
  } else if (this.customSize === "medium-14") {
    this.pizzaPrice += 650;
  }  else if (this.customSize === "large-20") {
  this.pizzaPrice += 1000;
  }else if (this.customSize === "large-18") {
    this.pizzaPrice += 1000;
  }
  if (this.crust === "crust") {
    this.pizzaPrice += 0;
  } else if (this.crust === "light crust") {
    this.pizzaPrice += 0;
  } else if (this.crust === "extra crust") {
    this.pizzaPrice += 0;
  }
  this.pizzaPrice += this.sauce;
  this.pizzaPrice += this.toppings1;
  this.pizzaPrice += this.toppings2;
  this.pizzaPrice += this.toppings3;
  return this.pizzaPrice;
}
Order.prototype.sideCost = function () {
  return this.deliveryFee;
}
Order.prototype.finalCost = function () {
  var cartTotalPrice = 0;
  for (var arrayElement = 0; arrayElement < totalPriceArray.length; arrayElement ++) {
    cartTotalPrice += totalPriceArray[arrayElement]; //////////////////////IMPORTANT!!! How to add contents of an array together
  }
  return cartTotalPrice;
}
function Address (firstname, lastname, streetAddress, city, estate, phone) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.streetAddress = streetAddress;
  this.city = city;
  this.estate = estate;
  this.phone = phone;
  this.deliveryAddress = (firstname + " "+ lastname + " " + streetAddress + "  " + city + ", " + estate + "  " + phone);
}


//User Interface Logic
$(document).ready(function(event) {
/////Landing Page Btns
  $("#pickup-btn").click(function() {
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("PICKUP BY CUSTOMER");
  });

  $("#back-button").click(function() {
    $("#order-content").hide();
    $("#landing-content").show();
    $("#delivery-option").text("PICKUP BY CUSTOMER");
  });

  $("#delivery-btn").click(function() {
    $("#address").show();
    $("#pickup-btn,#delivery-btn,#landing-tagline").hide();
  });
  $("form#address-form").submit(function(event) {
    event.preventDefault();
    var firstname = $("input#first-name").val();
    var lastname = $("input#last-name").val();
    var streetAddress = $("input#street-add").val();
    var city = $("input#city-add").val();
    var estate = $("select#estate-select").val();
    var phone = $("input#zip-add").val();
    var newAddress = new Address(firstname, lastname, streetAddress, city, estate, phone)
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("DELIVER TO:" + newAddress.deliveryAddress);
  });


  $("form#checkout-form").submit(function(event) {
    event.preventDefault();
    var firstname = $("input#first-name").val();
    var lastname = $("input#last-name").val();
   
    var phone = $("input#zip-add").val();
    var newAddress = new Address(firstname, lastname, streetAddress, city, estate, phone)
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("DELIVER TO:" + newAddress.deliveryAddress);
  });
  


  $("form#custom-pizza").submit(function(event) {
    event.preventDefault();
    var customSize = $("select#size").val();
    var sauce = $("select#sauce").val();
    var crust = $("select#crust").val();
    var toppings1 = $("select#toppings1").val();
    var toppings2 = $("select#toppings2").val();
    var toppings3 = $("select#toppings3").val();
    var pizzaDetails = ("<hr>" + customSize + "<br>  <b>Sauce : </b>" + sauce + ",<br> <b>Crust : </b>" + crust + ", <br><b>Toppings : </b>" + toppings1 + ", " + toppings2 + ", " + toppings3);
    var newPizzaOrder = new Order(customSize, crust);
    newPizzaOrder.pizzaCost();
    totalPriceArray.push(newPizzaOrder.pizzaPrice);
    $("#pizza-details-dropdown").show();
    $("#final-cost").text(newPizzaOrder.finalCost());
    $("#pizza-details").append("<ul><li>" + pizzaDetails + "<br><b>Price:  Ksh" + newPizzaOrder.pizzaPrice + "<b></li></ul>");
    $("#pizza-details1").append("<ul><li>" + pizzaDetails + "<br><b>Price:  Ksh" + newPizzaOrder.pizzaPrice + "<b></li></ul>");
    $("#final-cost1").text(newPizzaOrder.finalCost());

    $("#size, #sauce, #crust, #toppings1, #toppings2, #toppings3").val("");
  });
  $("#pizza-details-dropdown").click(function() {
    $("#pizza-details").toggle();
  });


  $("#checkout-btn").click(function() {
    $("#price-content").hide();
    $(".success-message").show();
  });
/////Side Orders

});