/* algorithm function */
function colorSelect(id) {
    var selectId = $("#" + id);
    // console.log(selectId.val());
    
    if(id == "select_top_clothes") { $("#top_clothes").css("background-color", selectId.val()); }
    else if(id == "select_bottom_clothes") { $("#bottom_clothes").css("background-color", selectId.val()); }
}

/* test function */
