/* index.html document ready */
var clothes_db = [];

$(document).ready(function () {
    for(var i=0, len=localStorage.length; i<len; i++) {
        clothes_db.push(localStorage.getItem(localStorage.key(i)));
    }

    $.each(clothes_db, function (i, item) {
        var clothes_color = item.split('_');
        var clothes = clothes_color[0];
        var color = clothes_color[1];

        var tagContent =
            '<tr onclick="getClothes(this);">' +
                '<td scope="row"><input type="checkbox" name="deleteList"></td>' +
                '<td scope="row">' + clothes +'</td>' +
                '<td scope="row">' + color + '</td>' +
            '</tr>';

        $("#clothes_db_table>tbody").append(tagContent);
    });
    if($("#clothes_db_table>tbody tr").length > 0) {
        $("#clothes_db_table").show();
        $("#comb_button").show();
        $("#delete_button").show();
    }


    // color_picker
    $("#top_color_picker").change(function() {
        $("#top_clothes").css("background-color", $("#top_color_picker").val());
        $("#select_top_color").val("color").prop("selected", true);
    });
    $("#bottom_color_picker").change(function() {
        $("#bottom_clothes").css("background-color", $("#bottom_color_picker").val());
        $("#select_bottom_color").val("color").prop("selected", true);
    });

    // add_color_picker
    $("#add_top_color_picker").change(function() {
        $("#top_clothes").css("background-color", $("#add_top_color_picker").val());
    });
    $("#add_bottom_color_picker").change(function() {
        $("#bottom_clothes").css("background-color", $("#add_bottom_color_picker").val());
    });

    // add_button
    $("#add_button").click(function() {
        var topType = $("#add_select_top_type").val();
        var bottomType = $("#add_select_bottom_type").val();

        if(topType != "default") {
            localStorage.setItem(localStorage.length, topType + "_" + $("#add_top_color_picker").val());
            clothes_db.push(topType + "_" + $("#add_top_color_picker").val());
        }
        if(bottomType != "default") {
            localStorage.setItem(localStorage.length, bottomType + "_" + $("#add_bottom_color_picker").val());
            clothes_db.push(bottomType + "_" + $("#add_bottom_color_picker").val());
        }

        $.each(clothes_db, function (i, item) {
            var clothes_color = item.split('_');
            var clothes = clothes_color[0];
            var color = clothes_color[1];

            var tagContent =
                '<tr onclick="getClothes(this);">' +
                    '<td scope="row"><input type="checkbox" name="deleteList"></td>' +
                    '<td scope="row">' + clothes +'</td>' +
                    '<td scope="row">' + color + '</td>' +
                '</tr>';

            $("#clothes_db_table>tbody").append(tagContent);
        });
        if($("#clothes_db_table>tbody tr").length > 0) {
            $("#clothes_db_table").show();
            $("#comb_button").show();
            $("#delete_button").show();
        }
    });
});