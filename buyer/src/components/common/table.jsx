import React from "react";
import MUIDataTable from "mui-datatables";
import {Delete} from './actions'

const Table = (props) => {

  const handleDeleteRow = (rowIndex, dataIndex) => {

    const rowToDelete = rowIndex.data[0].dataIndex;

    const id = props.dataTable[rowToDelete].id;

    Delete(props.table,id);
    
  };


  const Options = {
    filter: true,
    filterType: "checkbox",
    responsive: "simple",
    enableNestedDataAccess: '.',
    // search:false,
    onRowsDelete: (rowData, rowState) => {

      handleDeleteRow(rowData, rowState);
      
    },
    rowsPerPage: 10,
    selectableRows: "single",
    searchPlaceholder: "Search ...",
  };

  return (
    <MUIDataTable
      title={props.title}
      data={props.dataTable}
      columns={props.Columns}
      options={Options}
    />
  );
};

export default Table;
