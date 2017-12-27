//just for testing AMD
requirejs(["JsTableControllerAMD"], function(controller) {
    var table = controller.selectTable("#table");
    table.addColumn();
});