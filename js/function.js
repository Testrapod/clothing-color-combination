/* algorithm function */
function isEmpty(str){  
    if(typeof str == "undefined" || str == null || str == "") return true;
    else return false ;
}


function typeParser(clothes) {
    if(clothes == "short-sleeved" || clothes == "long-sleeved" || clothes == "shirt" || clothes == "hoodie") return "top";
    else if(clothes == "short-pants" || clothes == "long-pants" || clothes == "short-skirt" || clothes == "long-skirt") return "bottom";
    return "nothing";
}

function colorParser(color) {
    if(color == "white") return "#FFFFFF";
    else if(color == "red") return "#FF0000";
    else if(color == "yellow") return "#FFFF00";
    else if(color == "green") return "#008000";
    else if(color == "blue") return "#0000FF";
}

function checkColor(color) {
    if(color.length != 7) return false;
    if(color.indexOf('#') != 0) return false;

    color = color.substring(1, color.length);
    if (/^[a-fA-F0-9]+/.test(color)) return true;

    return false;
}


function typeSelect(id) {
    var selectId = $("#" + id);
    // console.log(selectId.val());

    if(id == "add_select_top_type") {
        if(selectId.val() == "-") { return; }
        // 상의 type 변경 로직 필요
    }
    else if(id == "add_select_bottom_type") {
        if(selectId.val() == "-") { return; }
        // 하의 type 변경 로직 필요
    }
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

    var clothes = td.eq(1).text().trim();
    var color = td.eq(2).text().trim();

    if(typeParser(clothes) == "top") {
        // 상의 type 변경 로직 필요
        $("#top_clothes").css("background-color", color);
    }
    else if(typeParser(clothes) == "bottom") {
        // 하의 type 변경 로직 필요
        $("#bottom_clothes").css("background-color", color);
    }
}

function setTopAndBottom(top_clothes, bottom_clothes) {
    // 1. set top clothes
    top_clothes = top_clothes.split('_');
    var clothes = top_clothes[0];
    var color = top_clothes[1];

    // 상의 type 변경 로직 필요
    $("#top_clothes").css("background-color", color);


    // 2. set bottom clothes
    bottom_clothes = bottom_clothes.split('_');
    clothes = bottom_clothes[0];
    color = bottom_clothes[1];

    // 하의 type 변경 로직 필요
    $("#bottom_clothes").css("background-color", color);
}


function clothesRandomComb(tops, bottoms) {
    var top = tops[Math.floor(Math.random() * tops.length)];
    var bottom = bottoms[Math.floor(Math.random() * bottoms.length)];
    return [top, bottom];
}