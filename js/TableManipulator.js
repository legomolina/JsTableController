var TableManipulator = function () {
    var table = null;
    var tableData = null;

    var tableManipulator = {
        init: function (initTable) {
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

            tableData = new TableData(table);
            console.log(tableData);
        },

        addRow: function (position) {
            position = position || -1;

            if (tableData.rows() < position)
                position = -1;

            return table.insertRow(position);
        },

        addNRows: function (count, position) {
            position = position || -1;
            count = count || 1;

            var rows = [];

            for (var i = 0; i < count; i++) {
                rows.push(this.addRow(position));

                position = (position === -1) ? -1 : position + 1;
            }

            return rows;
        },

        getTableData: function () {
            return tableData;
        }

    };


    return tableManipulator;
}();