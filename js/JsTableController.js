"use strict";

var JsTableController = function () {
    var tableController = {
        debug: true,

        /**
         * createTable: create an html table with the number of rows and columns specified
         * @param {number} rows Number of rows
         * @param {number} cols Number of columns
         * @returns {HTMLTableElement} The table
         */
        createTable: function (rows, cols) {
            var createdTable = document.createElement("table");

            for (var x = 0; x < rows; x++) {
                var row = createdTable.insertRow(-1);

                for (var y = 0; y < cols; y++)
                    row.insertCell(-1);
            }

            return createdTable;
        },

        /**
         * selectTable: create an instance of Manipulator object to allow user manage the table
         * @param {string|object} initTable The table to attach a Manipulator
         * @returns {Manipulator} The Manipulator instance
         */
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

                        return null;
                    }

                    break;

                default:
                    if (this.debug)
                        console.error("Table must be a selector string or a table document node.");

                    return null;
            }

            return new Manipulator(table);
        }
    };

    /**
     * Manipulator: the main class that allows user to manage the table
     * @param {HTMLTableElement} t The table to be managed
     * @constructor
     */
    function Manipulator(t) {
        var table = t;
        var tableData = new TableData(table);

        /**
         * addRow: adds a row to the table and returns the inserted row
         * @param {number} [position] The position to insert the row or it will be inserted at the end
         * @returns {HTMLTableRowElement} The new row
         */
        this.addRow = function (position) {
            if (position === undefined || position > tableData.rows())
                position = -1;

            return table.insertRow(position);
        };

        /**
         * addNRows: adds N rows to the table at specified position and returns an array containing all rows
         * @param {number} count The quantity of rows to be inserted
         * @param {number} [startPosition] The position to start inserting rows
         * @returns {Array.<HTMLTableRowElement>} Inserted rows
         */
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

        /**
         * removeRow: removes the row given by the index
         * @param {number} rowIndex The index of the row to be removed
         */
        this.removeRow = function (rowIndex) {
            if (rowIndex > tableData.rows()) {
                if (tableManipulator.debug)
                    console.error("Row index is greater than the number of rows.");

                return;
            }

            table.deleteRow(rowIndex);
        };

        /**
         * removeNRows: removes N rows starting at startPosition
         * @param {number} count The quantity of rows to be removed
         * @param {number} [startPosition] The position to start removing rows
         */
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

        /**
         * addColumn: adds a column at specified position
         * @param {number} [position] The position to insert the column or will be inserted at the end
         * @returns {Array.<HTMLTableDataCellElement>} The inserted cells
         */
        this.addColumn = function (positHTMLTableDataCellElemention) {
            if (position === undefined || position > tableData.cols())
                position = -1;

            var cells = [];

            for (var i = 0; i < tableData.rows(); i++)
                cells.push(addCell(i, position));

            return cells;
        };

        /**
         * addNColumns: adds N columns at specified start position
         * @param {number} count Quantity of columns to be inserted
         * @param {number} [startPosition] Position to start to insert columns or they will be inserted at the end
         * @returns {Array.<HTMLTableDataCellElement>} The inserted cells
         */
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

        /**
         * removeColumn: removes the column at specified index
         * @param {number} colIndex The index of the column to be removed
         */
        this.removeColumn = function (colIndex) {
            if (colIndex > tableData.cols()) {
                if (tableManipulator.debug)
                    console.error("Col index is greater than the number of cols.");

                return;
            }

            for (var i = 0; i < tableData.rows(); i++)
                table.rows[i].deleteCell(colIndex);
        };

        /**
         * removeNColumns: removes N columns starting at startPosition
         * @param {number} count The quantity of columns to be deleted
         * @param {number} [startPosition] The starting position to delete columns
         */
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

        /**
         * clearTable: clears the table (SQL = truncate)
         */
        this.clearTable = function () {
            table.innerHTML = "";
        };

        /**
         * removeTable: removes the table from the document
         */
        this.removeTable = function () {
            table.parentNode.removeChild(table);
        };

        /**
         * getTableData: returns the TableData object attached to the table
         * @returns {TableData} The TableData object
         */
        this.getTableData = function () {
            return tableData;
        };

        /**
         * addCell: adds a cell to the specified row in the given index and returns the new cell
         * @param {number} rowIndex The index of the row that will be the cell attached
         * @param {number} cellPosition The position inside the row where will be created the new cell
         * @returns {HTMLTableDataCellElement} The created cell
         */
        function addCell(rowIndex, cellPosition) {
            if (rowIndex === undefined || rowIndex > tableData.rows())
                rowIndex = -1;

            if (cellPosition === undefined || cellPosition > tableData.cols())
                cellPosition = -1;

            return table.rows[rowIndex].insertCell(cellPosition);
        }
    }

    return tableController;
}();