"use strict";

var TableManipulator = function () {
    var tableManipulator = {
        debug: true,

        createTable: function (rows, cols) {
            var createdTable = document.createElement("table");

            for (var x = 0; x < rows; x++) {
                var row = createdTable.insertRow(-1);

                for (var y = 0; y < cols; y++)
                    row.insertCell(-1);
            }

            return createdTable;
        },

        selectTable: function (initTable) {
            var table;

            switch (typeof initTable) {
                case "string":
                    table = document.querySelector(initTable);
                    break;

                case "object":
                    if (initTable.hasOwnProperty("nodeName") && initTable.nodeName === "TABLE")
                        table = initTable;
                    else {
                        if (this.debug)
                            console.error("Table must be a selector string or a table document node.");

                        return;
                    }

                    break;

                default:
                    if (this.debug)
                        console.error("Table must be a selector string or a table document node.");

                    return;
            }

            return new Manipulator(table);
        }
    };

    function Manipulator(t) {
        var table = t;
        var tableData = new TableData(table);

        this.addRow = function (position) {
            if (position === undefined || position > tableData.rows())
                position = -1;

            return table.insertRow(position);
        };

        this.addNRows = function (count, startPosition) {
            if (startPosition === undefined || startPosition > tableData.rows())
                startPosition = -1;

            count = (count === undefined) ? 1 : count;

            var rows = [];

            for (var i = 0; i < count; i++) {
                rows.push(this.addRow(startPosition));

                startPosition = (startPosition === -1) ? -1 : startPosition + 1;
            }

            return rows;
        };

        this.removeRow = function (rowIndex) {
            if (rowIndex > tableData.rows()) {
                if (tableManipulator.debug)
                    console.error("Row index is greater than the number of rows.");

                return;
            }

            table.deleteRow(rowIndex);
        };

        this.removeNRows = function (count, startPosition) {
            if (startPosition === undefined)
                startPosition = 0;

            count = (count === undefined) ? 1 : count;

            if (startPosition > tableData.rows()) {
                if (tableManipulator.debug)
                    console.error("Starting position is greater than the number of rows.");

                return;
            }

            if ((count + startPosition) > tableData.rows()) {
                if(startPosition > 0)
                    for (var i = 0; i <= tableData.rows() - startPosition; i++)
                        this.removeRow(startPosition);
                else
                    this.clearTable();
            }

            else
                for (var i = 0; i < count; i++)
                    this.removeRow(startPosition);
        };

        this.addColumn = function (position) {
            if (position === undefined || position > tableData.cols())
                position = -1;

            var cells = [];

            for (var i = 0; i < tableData.rows(); i++)
                cells.push(addCell(i, position));

            return cells;
        };

        this.addNColumns = function (count, startPosition) {
            if (startPosition === undefined || startPosition > tableData.cols())
                startPosition = -1;

            count = (count === undefined) ? 1 : count;

            var cells = [];

            for (var i = 0; i < count; i++) {
                cells.push(this.addColumn(startPosition));

                startPosition = (startPosition === -1) ? -1 : startPosition + 1;
            }

            return cells;
        };

        this.removeColumn = function (colIndex) {
            if (colIndex > tableData.cols()) {
                if (tableManipulator.debug)
                    console.error("Col index is greater than the number of cols.");

                return;
            }

            for (var i = 0; i < tableData.rows(); i++)
                table.rows[i].deleteCell(colIndex);
        };

        this.removeNColumns = function(count, startPosition) {
            if (startPosition === undefined)
                startPosition = 0;

            count = (count === undefined) ? 1 : count;

            if (startPosition > tableData.cols()) {
                if (tableManipulator.debug)
                    console.error("Starting position is greater than the number of cols.");

                return;
            }

            if ((count + startPosition) > tableData.cols()) {
                if(startPosition > 0)
                    for (var i = 0; i <= tableData.cols() - startPosition; i++)
                        this.removeColumn(startPosition);
                else
                    this.clearTable();
            }

            else
                for (var i = 0; i < count; i++)
                    this.removeColumn(startPosition);
        };

        this.clearTable = function () {
            table.innerHTML = "";
        };

        this.removeTable = function () {
            table.parentNode.removeChild(table);
        };

        this.getTableData = function () {
            return tableData;
        };

        function addCell(rowIndex, cellPosition) {
            if (rowIndex === undefined || rowIndex > tableData.rows())
                rowIndex = -1;

            if (cellPosition === undefined || cellPosition > tableData.cols())
                cellPosition = -1;

            return table.rows[rowIndex].insertCell(cellPosition);
        }
    }

    return tableManipulator;
}();