import React, { useEffect, useState } from "react";
import { TabsProps, Tabs } from "antd";
import { useParams } from "react-router-dom";
import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import { engages_party, product } from "@mobicom/tmf-dti";
import { editMeta } from "@/forms/product/catalog";
import RelatedPartyRef from "@/refs/related-party";
import CategoryRef from "@/refs/category";
import DetailComponent from "@/components/app-form/details";
import { getData, getValidForToObject } from "@/constants/converter";
import dayjs from "dayjs";

const CatalogView: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<product.ProductCatalog>();
  const [activeKey, setActiveKey] = useState<string>("0");

  useEffect(() => {
    find();
  }, []);

  async function find() {
    try {
      setLoading(true);
      const resp = await httpService.get<product.ProductCatalog>(
        `/product-catalog/catalog/${params.id}`
      );
      setData(getData(resp));
      setLoading(false);
    } catch (error: any) {
      notifyService.error(error.message);
    }
  }

  const onSaveDetail = async (values: product.ProductCatalog) => {
    try {
      values.validFor = getValidForToObject(values.validFor);
      values.lastUpdate = dayjs(new Date())
        .format("YYYY-MM-DDThh:mm:ss.sZ")
        .toString();

      const resp = await httpService.patch<product.ProductCatalog>(
        `/product-catalog/catalog/${params.id}`,
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

  const onSaveParty = async (relatedParty: engages_party.RelatedParty[]) => {
    try {
      const resp = await httpService.patch<product.ProductCatalog>(
        `/product-catalog/catalog/${params.id}`,
        {
          data: {
            relatedParty: relatedParty,
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

  const onSaveCategory = async (categories: product.CategoryRef[]) => {
    try {
      const resp = await httpService.patch<product.ProductCatalog>(
        `/product-catalog/catalog/${params.id}`,
        {
          data: {
            category: categories,
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

  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "Details",
      children: (
        <DetailComponent data={data} meta={editMeta} onSave={onSaveDetail} />
      ),
    },
    {
      key: "1",
      label: "Related party",
      children: (
        <RelatedPartyRef
          data={data?.relatedParty || []}
          clickPrevious={onClickPrevious}
          saveAction={onSaveParty}
          loading={loading}
        />
      ),
    },
    {
      key: "2",
      label: "Category",
      children: (
        <CategoryRef
          data={data?.category || []}
          saveAction={onSaveCategory}
          clickPrevious={onClickPrevious}
          loading={loading}
          type={"product"}
        />
      ),
    },
  ];

  return loading === true ? (
    <p>Loading</p>
  ) : (
    <Tabs items={items} activeKey={activeKey} onChange={handleChange} />
  );
};

export default CatalogView;
