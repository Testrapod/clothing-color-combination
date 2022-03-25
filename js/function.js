/* algorithm function */
function colorParser(color) {
    if(color == "white") return "#FFFFFF";
    else if(color == "red") return "#FF0000";
    else if(color == "yellow") return "#FFFF00";
    else if(color == "green") return "#008000";
    else if(color == "blue") return "#0000FF";
}

function colorSelect(id) {
    var selectId = $("#" + id);
    // console.log(selectId.val());

    if(id == "select_top_color") {
        if(selectId.val() == "color") { return; }
        $("#top_clothes").css("background-color", selectId.val());
        $("#top_color_picker").val(colorParser(selectId.val()));
    }
    else if(id == "select_bottom_color") {
        if(selectId.val() == "color") { return; }
        $("#bottom_clothes").css("background-color", selectId.val());
        $("#bottom_color_picker").val(colorParser(selectId.val()));
    }
}

function getClothes(target) {
    var tr = $(target);
    var td = tr.children();

    var clothes = td.eq(1).text();
    var color = td.eq(2).text();

    if(clothes == "short-sleeved" || clothes == "long-sleeved" || clothes == "shirt" || clothes == "hoodie") {
        // 상의인 경우
        $("#top_clothes").css("background-color", color);
    }
    else if(clothes == "short-pants" || clothes == "long-pants" || clothes == "short-skirt" || clothes == "long-skirt") {
        // 하의인 경우
        $("#bottom_clothes").css("background-color", color);
    }
}

function typeSelect(id) {
    var selectId = $("#" + id);
    // console.log(selectId.val());
}
/* test function */
