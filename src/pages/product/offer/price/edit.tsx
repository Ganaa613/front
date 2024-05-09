import { editMeta } from "@/forms/product/offer/price";
import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import { common, product } from "@mobicom/tmf-dti";
import { Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailComponent from "@/components/app-form/details";
import {
  CharacteristicValueUse,
  OfferPriceRelationship,
  OfferingTerm,
  TaxItem,
  PolicyRef,
} from "@/refs";
import { getData, getValidForToObject } from "@/constants/converter";

const SpecificationView: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<product.ProductOfferingPrice>();
  const [activeKey, setActiveKey] = useState<string>("0");

  async function find() {
    try {
      setLoading(true);
      const resp = await httpService.get<product.ProductOfferingPrice>(
        `/product-catalog/offering-price/${params.id}`
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

  const onSaveDetail = async (values: product.ProductOfferingPrice) => {
    try {
      values.validFor = getValidForToObject(values.validFor) ?? {};
      await httpService.patch<product.ProductCatalog>(
        `/product-catalog/offering-price/${params.id}`,
        {
          data: values,
        }
      );
      notifyService.success("success");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSaveCharacteristic = async (
    values: product.ProductSpecificationCharacteristicValueUse[]
  ) => {
    try {
      await httpService.patch<product.ProductCatalog>(
        `/product-catalog/offering-price/${params.id}`,
        {
          data: {
            prodSpecCharValueUse: values,
            "@type": data?.["@type"],
          },
        }
      );
      notifyService.success("success");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSaveTax = async (taxs: common.TaxItem[]) => {
    try {
      await httpService.patch(`/product-catalog/offering-price/${params.id}`, {
        data: {
          tax: taxs,
          "@type": data?.["@type"],
        },
      });
      notifyService.success("Successfully");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSaveRelationship = async (
    relation: product.ProductOfferingPriceRelationship[]
  ) => {
    try {
      await httpService.patch(`/product-catalog/offering-price/${params.id}`, {
        data: {
          popRelationship: relation,
          "@type": data?.["@type"],
        },
      });
      notifyService.success("Successfully");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };
  const onSaveTerms = async (terms: product.ProductOfferingTerm[]) => {
    try {
      await httpService.patch(`/product-catalog/offering-price/${params.id}`, {
        data: {
          productOfferingTerm: terms,
          "@type": data?.["@type"],
        },
      });
      notifyService.success("Successfully");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSavePolicy = async (policy: common.PolicyRef[]) => {
    try {
      await httpService.patch(`/product-catalog/offering-price/${params.id}`, {
        data: {
          policy: policy,
          "@type": data?.["@type"],
        },
      });
      notifyService.success("Successfully");
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
      label: "Tax Item",
      children: (
        <TaxItem
          data={data?.tax ?? []}
          saveAction={onSaveTax}
          clickPrevious={onClickPrevious}
        />
      ),
    },
    {
      key: "2",
      label: "Characteristic",
      children: (
        <CharacteristicValueUse
          data={data?.prodSpecCharValueUse ?? []}
          saveAction={onSaveCharacteristic}
          clickPrevious={onClickPrevious}
        />
      ),
    },
    {
      key: "3",
      label: "Relationship",
      children: (
        <OfferPriceRelationship
          data={data?.popRelationship ?? []}
          saveAction={onSaveRelationship}
          clickPrevious={onClickPrevious}
        />
      ),
    },
    {
      key: "4",
      label: "Term",
      children: (
        <OfferingTerm
          data={data?.productOfferingTerm ?? []}
          saveAction={onSaveTerms}
          clickPrevious={onClickPrevious}
        />
      ),
    },
    {
      key: "5",
      label: "Policy",
      children: (
        <PolicyRef
          data={data?.policy ?? []}
          saveAction={onSavePolicy}
          clickPrevious={onClickPrevious}
        />
      ),
    },
  ];

  return loading === true ? (
    "Loading"
  ) : (
    <Tabs items={items} activeKey={activeKey} onChange={handleChange} />
  );
};

export default SpecificationView;
