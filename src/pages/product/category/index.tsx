import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import { product } from "@mobicom/tmf-dti";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import AppTable from "@/components/app-table";
import AppTableItemControll from "@/components/app-tableItem-controll";
import queryBuilder from "@/services/queryBuilder";
import { ActionType, ProColumns } from "@ant-design/pro-table";
import { useRef } from "react";
// import dayjs from "dayjs";
import moment from "moment";

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();

  async function handleDelete(id: string) {
    try {
      await httpService.delete(`/product-catalog/category/${id}`);
      actionRef.current?.reload();
      notifyService.success(`Category succcessfully deleted`);
    } catch (error: any) {
      notifyService.error(error.message);
    }
  }

  const request = async (params: any) => {
    try {
      const queryParams = queryBuilder(params);
      const res = await httpService.get<list.IResponse<product.Category>>(
        `/product-catalog/category?${queryParams}`
      );

      return {
        success: true,
        data: res.data,
        total: res.total,
      };
    } catch (error: any) {
      notifyService.error(error.message);
      return {
        success: false,
      };
    }
  };

  const columns: ProColumns<product.Category>[] = [
    { key: "id", title: "Id", dataIndex: "id", search: false, width: 250 },
    { key: "name", title: "Name", dataIndex: "name" },
    { key: "href", title: "Href", dataIndex: "href", search: false },
    {
      key: "lifecycleStatus",
      title: "Lifecycle Status",
      dataIndex: "lifecycleStatus",
      valueType: "select",
      valueEnum: {
        Active: { text: "Active" },
        Inactive: { text: "Inactive" },
      },
    },
    {
      key: "lastUpdate",
      title: "Last update",
      dataIndex: "lastUpdate",
      search: false,
      // render: (val: any) =>
      //   dayjs(val).isValid() ? dayjs(val).format("YYYY-MM-DD HH:mm:ss") : "",
      // sorter: (a: any, b: any) => a - b,
      sorter: (a, b) =>
        moment(a.lastUpdate).unix() - moment(b.lastUpdate).unix(),
      render: (text: any) => (
        <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
      ),
    },
    {
      key: "action",
      title: "Action",
      search: false,
      width: 100,
      align: "center",
      render: (record: any) => (
        <AppTableItemControll
          viewAction={() => navigate(`/product/category/${record.id}`)}
          deleteAction={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <>
      <AppTable
        rowKey="id"
        columns={columns}
        request={request}
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => navigate("/product/category/create")}
          >
            Add
          </Button>,
        ]}
      />
    </>
  );
};

export default CategoryPage;
