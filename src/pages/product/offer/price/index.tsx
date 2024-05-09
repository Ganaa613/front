import AppTable from "@/components/app-table";
import AppTableItemControll from "@/components/app-tableItem-controll";
import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import queryBuilder from "@/services/queryBuilder";
import { ActionType, ProColumns } from "@ant-design/pro-table";
import { product } from "@mobicom/tmf-dti";
import { Button } from "antd";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OfferPricePage() {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<product.ProductOfferingPrice>[] = [
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
      key: "isBundle",
      title: "Is Bundle",
      dataIndex: "isBundle",
    },
    {
      key: "@type",
      title: "@type",
      dataIndex: "@type",
    },
    {
      title: "Action",
      render: (record: any) => (
        <AppTableItemControll
          viewAction={() => navigate(`/product/offer-price/${record.id}`)}
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
      const res = await httpService.get<{
        data: product.Category[];
        total: number;
      }>(`/product-catalog/offering-price?${queryParams}`);
      console.log("request, ", res);
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
      await httpService.delete(`/product-catalog/category/${id}`);
      actionRef.current?.reload();
      notifyService.success("Succcess");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  }

  return (
    <>
      <AppTable
        rowKey="id"
        columns={columns}
        request={request}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => navigate("/product/offer-price/create")}
          >
            Add
          </Button>,
        ]}
      />
    </>
  );
}
