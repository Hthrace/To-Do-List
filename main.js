let list = [];

let listIndex = "";

init();

function init() {
    storageToDos();
    addSavedToDos();
    $("#inputValue").toggleClass("visible");
    $(".minus").toggleClass("visible");
}

$("#inputValue").keypress(function (enter) {
    let inputValue = $("#inputValue").val();
    if (enter.which === 13) {
        $("#inputValue").val("");
        list.push(inputValue);
        listIndex = list.length - 1;
        addToDo(list[listIndex]);
        let listStorage = JSON.stringify(list);
        localStorage.setItem("list", listStorage);
        return listIndex;
    } else {
        return;
    }
});

function addToDo(num) {
    let toDo = $("<li class=\"list\">" + num + "</li>").on("click", function () {
        $(this).toggleClass("done");
        del = $("<span><i class=\"fa fa-trash-o\"style=\"color:red;float:left\"></i><span>").on("click", function () {
            let index = list.indexOf($(this).parent().text());
            if (index > -1) {
                list.splice(index, 1);
                $(this).remove();
                toDo.remove();
                let listStorage = JSON.stringify(list);
                localStorage.setItem("list", listStorage);
            } else {
                console.log("ಠ_ಠ");
            }
        });
        if ($(this).hasClass("done") === true) {
            toDo.prepend(del);
        } else {
            $(this).children().remove();
        }
    });
    $("#containerToDoList").append(toDo);
}

$(".add").on("click", function () {
    $("#inputValue").toggleClass("visible");
    $(this).toggleClass("visible");
    $(".minus").toggleClass("visible");
});

$(".minus").on("click", function () {
    $("#inputValue").toggleClass("visible");
    $(this).toggleClass("visible");
    $(".add").toggleClass("visible");
});

$("#deleteBTN").on("click", function () {
    list.splice(0, list.length);
    $("li").remove();
    let listStorage = JSON.stringify(list);
    localStorage.setItem("list", listStorage);
});

function addSavedToDos() {
    list.forEach(function (arry) {
        addToDo(arry);
    });
}

$("#deleteBTN").hover(function () {
    $(this).append($("<span id=\"delAllText\"> Delete All</span>"));
}, function () {
    $(this).find("#delAllText").last().remove();
});

$("#saveBTN").hover(function () {
    $(this).append($("<span id=\"saveText\"> Save</span>"));
}, function () {
    $(this).find("#saveText").last().remove();
});

$("#saveBTN").on("click", function () {
    let listStorage = JSON.stringify(list);
    localStorage.setItem("list", listStorage);
});

function storageToDos() {
    let listStorage = localStorage.getItem("list");
    list = JSON.parse(listStorage);
    if(!list) {
        list = [];
    }
}