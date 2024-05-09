import React, { useEffect, useState } from "react";
import { TabsProps, Tabs } from "antd";
import { useParams } from "react-router-dom";
import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import { product } from "@mobicom/tmf-dti";
import { editMeta } from "@/forms/product/category";
import OfferReference from "@/refs/offering";
import DetailComponent from "@/components/app-form/details";
import RefCategory from "@/refs/category";
import { getData, getValidForToObject } from "@/constants/converter";
import dayjs from "dayjs";

const CategoryView: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<product.Category>();
  const [activeKey, setActiveKey] = useState<string>("0");

  async function find() {
    try {
      setLoading(true);
      const resp = await httpService.get<product.Category>(
        `/product-catalog/category/${params.id}`
      );
      setData(getData(resp));
      setLoading(false);
    } catch (error: any) {
      notifyService.error(error.message);
    }
  }

  useEffect(() => {
    find();
  }, []);

  const onSaveDetails = async (values: product.Category) => {
    try {
      values.validFor = getValidForToObject(values.validFor) ?? {};
      values.lastUpdate = dayjs(new Date())
        .format("YYYY-MM-DDThh:mm:ss.sZ")
        .toString();
      const resp = await httpService.patch<product.Category>(
        `/product-catalog/category/${params.id}`,
        {
          data: values,
        }
      );
      setData(getData(resp));
      notifyService.success("Successfully saved");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSaveCategory = async (subCategories: product.CategoryRef[]) => {
    try {
      const resp = await httpService.patch<product.Category>(
        `/product-catalog/category/${params.id}`,
        {
          data: {
            subCategory: subCategories,
            "@type": data?.["@type"],
            lastUpdate: dayjs(new Date())
              .format("YYYY-MM-DDThh:mm:ss.sZ")
              .toString(),
          },
        }
      );
      setData(getData(resp));
      notifyService.success("Successfully saved");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };
  const onSaveOffer = async (offers: product.ProductOfferingRef[]) => {
    try {
      const resp = await httpService.patch<product.Category>(
        `/product-catalog/category/${params.id}`,
        {
          data: {
            productOffering: offers,
            "@type": data?.["@type"],
            lastUpdate: dayjs(new Date())
              .format("YYYY-MM-DDThh:mm:ss.sZ")
              .toString(),
          },
        }
      );
      setData(getData(resp));
      notifyService.success("Successfully saved");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onClickPrevious = () => {
    const keyNum = parseInt(activeKey, 10);
    if (keyNum > 1) {
      setActiveKey((keyNum - 1).toString());
    } else {
      setActiveKey("0");
    }
  };

  const handleChange = (key: string) => {
    setActiveKey(key);
  };

  const collapseItems: TabsProps["items"] = [
    {
      key: "0",
      label: "Details",
      children: (
        <DetailComponent data={data} meta={editMeta} onSave={onSaveDetails} />
      ),
    },
    {
      key: "1",
      label: "Sub Categories",
      children: (
        <RefCategory
          data={data?.subCategory ?? []}
          saveAction={onSaveCategory}
          clickPrevious={onClickPrevious}
          loading={loading}
          type={"product"}
        />
      ),
    },
    {
      key: "2",
      label: "Product Offerings",
      children: (
        <OfferReference
          data={data?.productOffering ?? []}
          saveAction={onSaveOffer}
          clickPrevious={onClickPrevious}
          loading={loading}
        />
      ),
    },
  ];

  return loading === true ? (
    <p>Loading</p>
  ) : (
    <Tabs items={collapseItems} activeKey={activeKey} onChange={handleChange} />
  );
};

export default CategoryView;
