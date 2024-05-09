import { editMeta } from "@/forms/product/specification";
import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import { common, product, resource, service } from "@mobicom/tmf-dti";
import { Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import DetailComponent from "@/components/app-form/details";
import { useParams } from "react-router-dom";
import CategoryRef from "@/refs/category";
import ResourceSpecRef from "@/refs/product/spec-resource";
import ServiceSpecRef from "@/refs/product/spec-service";
import ProductSpecRelRef from "@/refs/product/spec-rel";
import CharacteristicSpec from "@/components/app-char-spec";
import { getData, getValidForToObject } from "@/constants/converter";
import dayjs from "dayjs";

export const SpecificationView: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<product.ProductSpecification>();
  const [activeKey, setActiveKey] = useState<string>("0");

  async function find() {
    try {
      setLoading(true);
      const resp = await httpService.get<product.ProductSpecification>(
        `/product-catalog/specification/${params.id}`
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

  const onSaveDetail = async (values: product.ProductSpecification) => {
    try {
      values.validFor = getValidForToObject(values.validFor) ?? {};
      values.lastUpdate = dayjs(new Date())
        .format("YYYY-MM-DDThh:mm:ss.sZ")
        .toString();
      const resp = await httpService.patch(
        `/product-catalog/specification/${params.id}`,
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
      const resp = await httpService.patch(
        `/product-catalog/specification/${params.id}`,
        {
          data: {
            category: subCategories,
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

  const onSaveResourceSpec = async (
    resource: resource.ResourceSpecificationRef[]
  ) => {
    try {
      const resp = await httpService.patch(
        `/product-catalog/specification/${params.id}`,
        {
          data: {
            resourceSpecification: resource,
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

  const onSaveServiceSpec = async (
    resource: service.ServiceSpecificationRef[]
  ) => {
    try {
      const resp = await httpService.patch(
        `/product-catalog/specification/${params.id}`,
        {
          data: {
            serviceSpecification: resource,
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

  const onSaveProductSpecRel = async (
    resource: product.ProductSpecificationRelationship[]
  ) => {
    try {
      const resp = await httpService.patch(
        `/product-catalog/specification/${params.id}`,
        {
          data: {
            productSpecificationRelationship: resource,
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

  const onSaveProductSpecChar = async (
    resource: common.CharacteristicSpecification[]
  ) => {
    try {
      const resp = await httpService.patch(
        `/product-catalog/specification/${params.id}`,
        {
          data: {
            productSpecCharacteristic: resource,
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
    {
      key: "2",
      label: "Resource Specification",
      children: (
        <ResourceSpecRef
          data={data?.resourceSpecification || []}
          saveAction={onSaveResourceSpec}
          // isDisable={data?.serviceSpecification?.length !== 0}
          clickPrevious={onClickPrevious}
          loading={loading}
        />
      ),
    },
    {
      key: "3",
      label: "Service Specification",
      children: (
        <ServiceSpecRef
          data={data?.serviceSpecification || []}
          saveAction={onSaveServiceSpec}
          // isDisable={data?.resourceSpecification?.length !== 0}
          clickPrevious={onClickPrevious}
          loading={loading}
        />
      ),
    },
    {
      key: "4",
      label: "Product Spec Relationship",
      children: (
        <ProductSpecRelRef
          data={data?.productSpecificationRelationship ?? []}
          saveAction={onSaveProductSpecRel}
          clickPrevious={onClickPrevious}
          loading={loading}
        />
      ),
    },
    {
      key: "5",
      label: "Product Spec Characteristic",
      children: (
        <CharacteristicSpec
          data={data?.productSpecCharacteristic ?? []}
          saveAction={onSaveProductSpecChar}
          clickPrevious={onClickPrevious}
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

export default SpecificationView;
