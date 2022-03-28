var top_clothes_db = {}; // prevention of duplication
var bottom_clothes_db = {}; // prevention of duplication

var tops_for_comb = [];
var bottoms_for_comb = [];

function settingTopClothesData() {
    $("#top_clothes_db_table>tbody").empty();

    $.each(top_clothes_db, function (key, value) {
        var clothes_color = value.split('_');
        var clothes = clothes_color[0];
        var color = clothes_color[1];

        var tagContent =
            '<tr onclick="getClothes(this);">' +
                '<td><input class="form-check-input" type="checkbox" name="top_check_list"></td>' +
                '<td>' + clothes +'</td>' +
                '<td class="d-flex justify-content-center">' +
                    '<div class="sample-color align-self-center" style="background-color:' + color + ';"></div>' +
                    ' &nbsp; ' +
                    color +
                '</td>' +
            '</tr>';

        $("#top_clothes_db_table>tbody").append(tagContent);
    });

    $("#top_selected_clothes_num").text(0);
    $("#top_total_clothes_num").text(Object.keys(top_clothes_db).length);
    $("#top_all_check").prop("checked", false);

    // check_list
    $("input:checkbox[name=top_check_list]").click(function() {
        $("#top_selected_clothes_num").text($("input:checkbox[name=top_check_list]:checked").length);
        if($("input:checkbox[name=top_check_list]:checked").length == Object.keys(top_clothes_db).length) {
            $("#top_all_check").prop("checked", true);
        } else {
            $("#top_all_check").prop("checked", false);
        }
    });
}

function settingBottomClothesData() {
    $("#bottom_clothes_db_table>tbody").empty();

    $.each(bottom_clothes_db, function (key, value) {
        var clothes_color = value.split('_');
        var clothes = clothes_color[0];
        var color = clothes_color[1];

        var tagContent =
            '<tr onclick="getClothes(this);">' +
                '<td><input class="form-check-input" type="checkbox" name="bottom_check_list"></td>' +
                '<td>' + clothes +'</td>' +
                '<td class="d-flex justify-content-center">' +
                    '<div class="sample-color align-self-center" style="background-color:' + color + ';"></div>' +
                    ' &nbsp; ' +
                    color +
                '</td>' +
            '</tr>';

        $("#bottom_clothes_db_table>tbody").append(tagContent);
    });

    $("#bottom_selected_clothes_num").text(0);
    $("#bottom_total_clothes_num").text(Object.keys(bottom_clothes_db).length);
    $("#bottom_all_check").prop("checked", false);

    // check_list
    $("input:checkbox[name=bottom_check_list]").click(function() {
        $("#bottom_selected_clothes_num").text($("input:checkbox[name=bottom_check_list]:checked").length);
        if($("input:checkbox[name=bottom_check_list]:checked").length == Object.keys(bottom_clothes_db).length) {
            $("#bottom_all_check").prop("checked", true);
        } else {
            $("#bottom_all_check").prop("checked", false);
        }
    });
}

function addTopClothesData(clothes_color) {
    var check = true;
    
    $("#top_clothes_db_table>tbody tr").each(function() {
        var tr = $(this);
        var td = tr.children();

        var tmp_clothes = td.eq(1).text().trim();
        var tmp_color = td.eq(2).text().trim();
        var tmp_clothes_color = tmp_clothes + "_" + tmp_color;
    
        if(tmp_clothes_color == clothes_color) {
            check = false;
            return false;
        }
    });

    if(check) {
        clothes_color = clothes_color.split('_');
        var clothes = clothes_color[0];
        var color = clothes_color[1];

        var tagContent =
            '<tr onclick="getClothes(this);">' +
                '<td><input class="form-check-input" type="checkbox" name="top_check_list"></td>' +
                '<td>' + clothes +'</td>' +
                '<td class="d-flex justify-content-center">' +
                    '<div class="sample-color align-self-center" style="background-color:' + color + ';"></div>' +
                    ' &nbsp; ' +
                    color +
                '</td>' +
            '</tr>';

        $("#top_clothes_db_table>tbody").append(tagContent);

        $("#top_total_clothes_num").text(Object.keys(top_clothes_db).length);
        $("#top_all_check").prop("checked", false);

        // check_list
        $("input:checkbox[name=top_check_list]").click(function() {
            $("#top_selected_clothes_num").text($("input:checkbox[name=top_check_list]:checked").length);
            if($("input:checkbox[name=top_check_list]:checked").length == Object.keys(top_clothes_db).length) {
                $("#top_all_check").prop("checked", true);
            } else {
                $("#top_all_check").prop("checked", false);
            }
        });
    }
}

function addBottomClothesData(clothes_color) {
    var check = true;
    
    $("#bottom_clothes_db_table>tbody tr").each(function() {
        var tr = $(this);
        var td = tr.children();

        var tmp_clothes = td.eq(1).text().trim();
        var tmp_color = td.eq(2).text().trim();
        var tmp_clothes_color = tmp_clothes + "_" + tmp_color;
    
        if(tmp_clothes_color == clothes_color) {
            check = false;
            return false;
        }
    });

    if(check) {
        clothes_color = clothes_color.split('_');
        var clothes = clothes_color[0];
        var color = clothes_color[1];

        var tagContent =
            '<tr onclick="getClothes(this);">' +
                '<td><input class="form-check-input" type="checkbox" name="bottom_check_list"></td>' +
                '<td>' + clothes +'</td>' +
                '<td class="d-flex justify-content-center">' +
                    '<div class="sample-color align-self-center" style="background-color:' + color + ';"></div>' +
                    ' &nbsp; ' +
                    color +
                '</td>' +
            '</tr>';

        $("#bottom_clothes_db_table>tbody").append(tagContent);

        $("#bottom_total_clothes_num").text(Object.keys(bottom_clothes_db).length);
        $("#bottom_all_check").prop("checked", false);

        // check_list
        $("input:checkbox[name=bottom_check_list]").click(function() {
            $("#bottom_selected_clothes_num").text($("input:checkbox[name=bottom_check_list]:checked").length);
            if($("input:checkbox[name=bottom_check_list]:checked").length == Object.keys(bottom_clothes_db).length) {
                $("#bottom_all_check").prop("checked", true);
            } else {
                $("#bottom_all_check").prop("checked", false);
            }
        });
    }
}


function uploadClothesData() {
    var input = document.createElement("input");

    input.type = "file";
    input.accept = "text/plain";
    input.onchange = function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function() {    
            var lines = this.result.split("\n");

            for(var i=0; i<lines.length; i++){
                var clothes_color = lines[i].split('_');
                var clothes = clothes_color[0];
                var color = clothes_color[1];
                clothes_color = lines[i];

                if(isEmpty(clothes) || isEmpty(color)) continue;
                if(!checkColor(color)) continue;

                if(typeParser(clothes) == "top") {
                    localStorage.setItem(clothes_color, clothes_color);
                    top_clothes_db[clothes_color] = clothes_color;
                }
                else if(typeParser(clothes) == "bottom") {
                    localStorage.setItem(clothes_color, clothes_color);
                    bottom_clothes_db[clothes_color] = clothes_color;
                }
            }

            settingTopClothesData();
            settingBottomClothesData();
        };
        reader.readAsText(file);
    };
    input.click();
}

function downloadClothesData() {
    var fileContents = "";
    $.each(top_clothes_db, function (key, value) { fileContents += value + "\n" });
    $.each(bottom_clothes_db, function (key, value) { fileContents += value + "\n" });

    var a = document.createElement('a');

    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents));
    a.setAttribute('download', "ccc_data.txt");
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
}