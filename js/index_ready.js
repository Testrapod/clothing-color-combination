/* index.html document ready */
$(document).ready(function () {
    for(var i=0, len=localStorage.length; i<len; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(localStorage.key(i));

        if(key == value) {
            var clothes_color = value.split("_");
            var clothes = clothes_color[0];

            if(typeParser(clothes) == "top") top_clothes_db[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
            else if(typeParser(clothes) == "bottom") bottom_clothes_db[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
        }
    }
    settingTopClothesData();
    settingBottomClothesData();


    // color_picker
    $("#top_color_picker").change(function() {
        $("#top_clothes").css("background-color", $("#top_color_picker").val());
    });
    $("#bottom_color_picker").change(function() {
        $("#bottom_clothes").css("background-color", $("#bottom_color_picker").val());
    });


    // add_button
    $("#add_button").click(function() {
        var topType = $("#select_top_type").val();
        var bottomType = $("#select_bottom_type").val();

        var top_clothes = topType + "_" + $("#top_color_picker").val();
        var bottom_clothes = bottomType + "_" + $("#bottom_color_picker").val();

        var addCheck = false;

        if(!(top_clothes in top_clothes_db)) {
            localStorage.setItem(top_clothes, top_clothes);
            top_clothes_db[top_clothes] = top_clothes;

            addTopClothesData(top_clothes);
            addCheck = true;
        }
        if(!(bottom_clothes in bottom_clothes_db)) {
            localStorage.setItem(bottom_clothes, bottom_clothes);
            bottom_clothes_db[bottom_clothes] = bottom_clothes;

            addBottomClothesData(bottom_clothes);
            addCheck = true;
        }

        if(addCheck) {
            $("#alert_add_success").show();
            setTimeout(function() { $("#alert_add_success").fadeOut(); }, 2000);
        } else {
            $("#alert_add_fail").show();
            setTimeout(function() { $("#alert_add_fail").fadeOut(); }, 2000);
        }
    });


    // top_all_check
    $("#top_all_check").click(function() {
        var checked = $("#top_all_check").is(":checked");
		if(checked) {
            $("input:checkbox[name=top_check_list]").prop("checked", true);
            $("#top_selected_clothes_num").text($("input:checkbox[name=top_check_list]:checked").length);
        }
        else {
            $("input:checkbox[name=top_check_list]").prop("checked", false);
            $("#top_selected_clothes_num").text($("input:checkbox[name=top_check_list]:checked").length);
        }
	});

    // bottom_all_check
    $("#bottom_all_check").click(function() {
        var checked = $("#bottom_all_check").is(":checked");
		if(checked) {
            $("input:checkbox[name=bottom_check_list]").prop("checked", true);
            $("#bottom_selected_clothes_num").text($("input:checkbox[name=bottom_check_list]:checked").length);
        }
        else {
            $("input:checkbox[name=bottom_check_list]").prop("checked", false);
            $("#bottom_selected_clothes_num").text($("input:checkbox[name=bottom_check_list]:checked").length);
        }
	});

    // comb_button
    $("#comb_button").click(function() {
        var topCheckedList = $("input:checkbox[name=top_check_list]:checked");
        var bottomCheckedList = $("input:checkbox[name=bottom_check_list]:checked");

        tops_for_comb = [];
        bottoms_for_comb = [];

        topCheckedList.each(function(item) {
            var tr = topCheckedList.parent().parent().eq(item);
            var td = tr.children();

            var clothes = td.eq(1).text().trim();
            var color = td.eq(2).text().trim();
            var clothes_color = clothes + "_" + color;

            tops_for_comb.push(clothes_color);
        });

        bottomCheckedList.each(function(item) {
            var tr = bottomCheckedList.parent().parent().eq(item);
            var td = tr.children();

            var clothes = td.eq(1).text().trim();
            var color = td.eq(2).text().trim();
            var clothes_color = clothes + "_" + color;

            bottoms_for_comb.push(clothes_color);
        });

        if(tops_for_comb.length != 0 && bottoms_for_comb.length != 0) {
            var top_bottom = clothesRandomComb(tops_for_comb, bottoms_for_comb);
            top_clothes = top_bottom[0];
            bottom_clothes = top_bottom[1];

            setCombTopAndBottom(top_clothes, bottom_clothes);
            var combModal = new bootstrap.Modal(document.getElementById('combModal'));
            combModal.show();
        } else {
            $("#alert_comb").show();
            setTimeout(function() { $("#alert_comb").fadeOut(); }, 2000);
        }
    });

    // again_comb_button
    $("#again_comb_button").click(function() {
        var top_bottom = clothesRandomComb(tops_for_comb, bottoms_for_comb);
        top_clothes = top_bottom[0];
        bottom_clothes = top_bottom[1];

        setCombTopAndBottom(top_clothes, bottom_clothes);
    })

    // real_delete_button
    $("#real_delete_button").click(function() {
        var topCheckedList = $("input:checkbox[name=top_check_list]:checked");
        var bottomCheckedList = $("input:checkbox[name=bottom_check_list]:checked");

        if(topCheckedList.length + bottomCheckedList.length == 0) {
            $("#alert_delete_select").show();
            setTimeout(function() { $("#alert_delete_select").fadeOut(); }, 2000);
            return;
        }

        topCheckedList.each(function(item) {
            var tr = topCheckedList.parent().parent().eq(item);
            var td = tr.children();

            var clothes = td.eq(1).text().trim();
            var color = td.eq(2).text().trim();
            var clothes_color = clothes + "_" + color;

            localStorage.removeItem(clothes_color);
            delete top_clothes_db[clothes_color];
        });
        
        bottomCheckedList.each(function(item) {
            var tr = bottomCheckedList.parent().parent().eq(item);
            var td = tr.children();

            var clothes = td.eq(1).text().trim();
            var color = td.eq(2).text().trim();
            var clothes_color = clothes + "_" + color;

            localStorage.removeItem(clothes_color);
            delete bottom_clothes_db[clothes_color];
        });

        settingTopClothesData();
        settingBottomClothesData();

        $("#alert_delete_success").show();
        setTimeout(function() { $("#alert_delete_success").fadeOut(); }, 2000);
    });


    // upload_button && download_button
    $("#upload_button").click(function() { uploadClothesData(); });
    $("#download_button").click(function() { downloadClothesData(); });


    // closet_button
    $("#closet_button").click(function() {
        $("#closet").toggle();
        if($("#closet_button").text() == "Open closet") {
            $("#closet_button").css("margin-top", "20px");
            $("#closet_button").text("Close closet");
        }
        else {
            $("#closet_button").css("margin-top", "0px");
            $("#closet_button").text("Open closet");
        }
    });
});