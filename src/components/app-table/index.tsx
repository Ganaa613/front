import React from "react";
import ProTable, { ProTableProps } from "@ant-design/pro-table";

const AppTable: React.FC<ProTableProps<any, any>> = (props) => {
  return (
    <ProTable
      size="small"
      search={{
        filterType: "query",
        searchText: "Search",
        resetText: "Clear",
        // layout: "vertical",
        labelWidth: "auto",
        showHiddenNum: false,
        collapsed: false,
        collapseRender: false,
      }}
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 50,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "50"],
        position: ["bottomRight"],
      }}
      toolbar={{
        settings: undefined,
      }}
      {...props}
    />
  );
};

export default AppTable;
