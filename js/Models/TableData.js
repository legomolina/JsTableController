function TableData(table) {
    var tableObject = table;

    this.rows = function() {
        return tableObject.rows.length;
    };

    this.cols = function() {
        if(tableObject.rows.length > 0)
            return tableObject.rows[0].cells.length;

        return 0;
    };

    this.selectedCell = {
        top: 0,
        left: 0
    };
}