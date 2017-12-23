var TableManipulator = function () {
    var table = null;

    var tableManipulator = {
        init: function (initTable) {
            console.log(initTable);

            switch (typeof initTable) {
                case "string":
                    table = document.querySelector(initTable);
                    break;

                case "object":
                    if (initTable.hasOwnProperty("nodeName") && initTable.nodeName === "TABLE")
                        table = initTable;

                    else {
                        console.warn("Table must be a selector string or a table document node.");
                        return;
                    }
                    break;

                default:
                    console.warn("Table must be a selector string or a table document node.");
                    return;
            }
        }

    };


    return tableManipulator;
}();