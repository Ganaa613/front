import AppTable from "@/components/app-table";
import AppTableItemControll from "@/components/app-tableItem-controll";
import { LIFE_CYCLE_STATUS_TYPES } from "@/constants";
import { renderDate } from "@/constants/converter";
import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import queryBuilder from "@/services/queryBuilder";
import { ActionType, ProColumns } from "@ant-design/pro-table";
import { product } from "@mobicom/tmf-dti";
import { Button, Switch } from "antd";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OfferPage() {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<product.ProductOffering>[] = [
    {
      key: "id",
      title: "Id",
      dataIndex: "id",
      search: false,
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "lifecycleStatus",
      title: "Lifecycle status",
      dataIndex: "lifecycleStatus",
      valueType: "select",
      valueEnum: LIFE_CYCLE_STATUS_TYPES,
    },
    {
      key: "startDate",
      title: "Start Date",
      dataIndex: ["validFor", "startDateTime"],
      render: (val: any) => renderDate(val),
    },
    {
      key: "endDate",
      title: "End Date",
      dataIndex: ["validFor", "endDateTime"],
      render: (val: any) => renderDate(val),
    },
    {
      key: "isBundle",
      title: "IsBundle",
      dataIndex: "isBundle",
      render: (_, record) => <Switch checked={record.isBundle} />,
      readonly: true,
      initialValue: false,
      search: false,
    },
    {
      title: "Action",
      render: (record: any) => (
        <AppTableItemControll
          viewAction={() => navigate(`/product/offer/${record.id}`)}
          deleteAction={() => handleDelete(record.id)}
        />
      ),
      search: false,
      fixed: "right",
      width: 100,
      align: "center",
    },
  ];

  const request = async (params: any) => {
    try {
      const queryParams = queryBuilder(params);
      const res = await httpService.get<
        list.IResponse<product.ProductOffering[]>
      >(`/product-catalog/offering?${queryParams}`);
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

  async function handleDelete(id: string) {
    try {
      await httpService.delete(`/product-catalog/offering/${id}`);
      actionRef.current?.reload();
      notifyService.success("Succcess");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  }

  return (
    <AppTable
      rowKey="id"
      columns={columns}
      request={request}
      actionRef={actionRef}
      toolBarRender={() => [
        <Button
          key="1"
          type="primary"
          onClick={() => navigate("/product/offer/create")}
        >
          Add
        </Button>,
      ]}
    />
  );
}
