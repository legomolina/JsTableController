# JsTableController

OOP Controller to manage rows and columns from a html table with js

### Installation

#### Plain JS

1. Copy ./js/JsTableController.js and ./js/Models/TableData.js into your project.
2. Include both files into your page with ```<script>```.
3. Enjoy using tables.

#### AMD

1. Copy ./js/JsTableController.js and ./js/Models/TableData.js into your project.
2. Include ```require.js``` into your project.
3. Enjoy using tables.

### Usage

First of all, select a table:

```javascript
//plain js
var controller = JsTableController.selectTable("css selector");

//AMD
requirejs(["JsTableControllerAMD"], function(tableController) {
    var controller = tableController.selectTable("css selector");
});

```

If you are using AMD you need to require the module as I shown so from now, I'll suppose you have already imported it.

Then, manage the table with the methods:

```javascript
//Rows methods
controller.addRow(); //inserts a single row at the end of the table
controller.addRow(1); //inserts a single row before the index given
controller.addNRows(2); //inserts 2 rows at the end of the table
controller.addNRows(2, 1); //inserts 2 rows before the index given (1 in this example)
controller.removeRow(1); //removes the row given by the index
controller.removeNRows(2); //removes 2 rows from the end of the table
controller.removeNRows(2, 1); //removes 2 rows starting at the row given by the index

//Columns methods do the same as rows
controller.addColumn();
controller.addColumn(1);
controller.addNColumns(2);
controller.addNColumns(2, 1);
controller.removeColumn(1);
controller.removeNColumns(2);
controller.removeNColumns(2, 1);

controller.clearTable(); //removes all the content of the table
controller.removeTable(); //removes the table itself
controller.getTableData(); //returns the table data
```

Pay attention that `controller` is not the module. Controller is the return value of `JsTableController.selectTable()` method.
This is because you can manage multiple tables at the same time with several calls to `JsTableController.selectTable()` method.

```html
<table id="table">
    <tr>
        <td>Table 1</td>
    </tr>
</table>

<table id="table-2">
    <tr>
        <td>Table 2</td>
    </tr>
</table> 
```

```javascript
var table1Controller = JsTableController.selectTable("#table");
var table2Controller = JsTableController.selectTable("#table-2");
table1Controller.addRow();
table2Controller.addRow();
// some more code...
```

### Configuration
You can enable or disable the debug mode calling:

```javascript
JsTableController.debug = true | false;
```

With debug enabled errors will appear in browser's console. It's highly recommended to turn it off in production state.