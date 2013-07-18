var id = parseInt(getParameterByName("id"));

productAdapter.findById(id).done(function (product) {
    $(".small-pic").attr("src", "../assets/img/" + product.smallPic);
    $(".product-name").html(product.name);
    $(".style").html(product.style);
    $(".brewery").html(product.brewery);
    $(".origin").html(product.origin);
    $(".color").html(product.color);
    $(".alcohol").html(product.alcohol);
    $(".large-pic").attr("style", "background: url('../assets/img/" + product.largePic + "') center center no-repeat;");
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(".small-pic").on('click', function () {
    $(".large-pic-bg").show();
    $(".large-pic").show();
});
$(".large-pic").on('click', function () {
    $(".large-pic").hide();
    $(".large-pic-bg").hide();
});
