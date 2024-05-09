import {
  ChannelRef,
  CategoryRef,
  OfferingRelationship,
  OfferingTerm,
  AgreementRef,
  OfferPriceRef,
  BundleProductOffer,
  ProductSpecificationRef,
} from "@/refs";
import { editMeta } from "@/forms/product/offer/offer";
import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import { common, product } from "@mobicom/tmf-dti";
import { Collapse, CollapseProps, Tabs, TabsProps } from "antd";
import DetailComponent from "@/components/app-form/details";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacteristicSpec from "@/components/app-char-spec";
import ProductSpecCharValueUse from "@/components/app-spec-char-value";
import {
  CarryOutOutlined,
  DeploymentUnitOutlined,
  DollarOutlined,
  FileTextOutlined,
  GroupOutlined,
  IdcardOutlined,
  InsertRowAboveOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { getData, getValidForToObject } from "@/constants/converter";

const SpecificationView: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<product.ProductOffering>();
  const [activeKey, setActiveKey] = useState<string>("0");

  async function find() {
    try {
      setLoading(true);
      const resp = await httpService.get<product.ProductOffering>(
        `/product-catalog/offering/${params.id}`
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

  const onSaveDetail = async (values: product.ProductOffering) => {
    try {
      values.validFor = getValidForToObject(values.validFor) ?? {};
      await httpService.patch(`/product-catalog/offering/${params.id}`, {
        data: values,
      });
      setData(values);
      notifyService.success("Successfully");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSaveBundle = async (bundle: product.BundledProductOffering[]) => {
    try {
      await httpService.patch(`/product-catalog/offering/${params.id}`, {
        data: {
          bundledProductOffering: bundle,
          "@type": data?.["@type"],
        },
      });
      notifyService.success("Successfully");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSaveCategory = async (category: product.CategoryRef[]) => {
    try {
      await httpService.patch(`/product-catalog/offering/${params.id}`, {
        data: {
          category: category,
          "@type": data?.["@type"],
        },
      });
      notifyService.success("Successfully");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSaveChannel = async (channel: common.ChannelRef[]) => {
    try {
      await httpService.patch(`/product-catalog/offering/${params.id}`, {
        data: {
          channel: channel,
          "@type": data?.["@type"],
        },
      });
      notifyService.success("Successfully");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSaveCharacteristic = async (
    chars: common.CharacteristicSpecification[]
  ) => {
    try {
      await httpService.patch(`/product-catalog/offering/${params.id}`, {
        data: {
          productOfferingCharacteristic: chars,
          "@type": data?.["@type"],
        },
      });
      notifyService.success("Successfully");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSaveProductSpecChar = async (
    values: product.ProductSpecificationCharacteristicValueUse[]
  ) => {
    try {
      await httpService.patch(`/product-catalog/offering/${params.id}`, {
        data: {
          prodSpecCharValueUse: values,
          "@type": data?.["@type"],
        },
      });
      notifyService.success("Successfully");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSaveAgreement = async (agreement: product.AgreementRef[]) => {
    try {
      await httpService.patch(`/product-catalog/offering/${params.id}`, {
        data: {
          agreement: agreement,
          "@type": data?.["@type"],
        },
      });
      notifyService.success("Successfully");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSaveRelationship = async (
    relationship: product.ProductOfferingRelationship[]
  ) => {
    try {
      await httpService.patch(`/product-catalog/offering/${params.id}`, {
        data: {
          productOfferingRelationship: relationship,
          "@type": data?.["@type"],
        },
      });
      notifyService.success("Successfully");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSavePrice = async (
    price: (product.ProductOfferingPrice | product.ProductOfferingPriceRef)[]
  ) => {
    try {
      await httpService.patch(`/product-catalog/offering/${params.id}`, {
        data: {
          productOfferingPrice: price,
          "@type": "ProductOffering",
        },
      });
      notifyService.success("Successfully");
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const onSaveTerms = async (terms: product.ProductOfferingTerm[]) => {
    try {
      await httpService.patch(`/product-catalog/offering/${params.id}`, {
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

  const onSaveSpecification = async (
    spec: product.ProductSpecificationRef[]
  ) => {
    try {
      console.log("productSpecRef: ", spec);
      const req = spec[0] ?? {};
      await httpService.patch(`/product-catalog/offering/${params.id}`, {
        data: {
          productSpecification: req,
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

  const categoryAndChannels: CollapseProps["items"] = [
    {
      key: "1",
      label: "Categories",
      children: (
        <CategoryRef
          data={data?.category ?? []}
          saveAction={onSaveCategory}
          loading={loading}
          type="product"
        />
      ),
    },
    {
      key: "2",
      label: "Channels",
      children: (
        <ChannelRef data={data?.channel ?? []} saveAction={onSaveChannel} />
      ),
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "0",
      label: (
        <>
          <IdcardOutlined />
          <i>Details</i>
        </>
      ),
      children: (
        <DetailComponent data={data} meta={editMeta} onSave={onSaveDetail} />
      ),
    },
    {
      key: "1",
      label: (
        <>
          <GroupOutlined />
          <i>Category & Channels</i>
        </>
      ),
      children: <Collapse accordion items={categoryAndChannels} />,
    },
    {
      key: "2",
      label: (
        <>
          <CarryOutOutlined />
          <i>Agreements</i>
        </>
      ),
      children: (
        <AgreementRef
          data={data?.agreement ?? []}
          saveAction={onSaveAgreement}
          clickPrevious={onClickPrevious}
        />
      ),
    },
    {
      key: "3",
      label: (
        <>
          <InsertRowAboveOutlined />
          <i>Bundled offers</i>
        </>
      ),
      children: (
        <BundleProductOffer
          isDisabled={!data?.isBundle}
          data={data?.bundledProductOffering ?? []}
          saveAction={onSaveBundle}
          clickPrevious={onClickPrevious}
        />
      ),
    },
    {
      key: "4",
      label: (
        <>
          <InsertRowAboveOutlined />
          <i>Product Specification</i>
        </>
      ),
      children: (
        <ProductSpecificationRef
          // isDisabled={data?.isBundle}
          data={
            data?.productSpecification ? [...[data?.productSpecification]] : []
          }
          saveAction={onSaveSpecification}
          loading={false}
          type={"product"}
        />
      ),
    },
    {
      key: "5",
      label: (
        <>
          <FileTextOutlined /> <i>Characteristics</i>
        </>
      ),
      children: (
        <CharacteristicSpec
          data={data?.productOfferingCharacteristic ?? []}
          saveAction={onSaveCharacteristic}
          clickPrevious={onClickPrevious}
        />
      ),
    },
    {
      key: "6",
      label: (
        <>
          <FileTextOutlined /> <i>Characteristic Value Use</i>
        </>
      ),
      children: (
        <ProductSpecCharValueUse
          data={data?.prodSpecCharValueUse ?? []}
          saveAction={onSaveProductSpecChar}
          clickPrevious={onClickPrevious}
        />
      ),
    },
    {
      key: "7",
      label: (
        <>
          <DollarOutlined />
          <i>Pricing</i>
        </>
      ),
      children: (
        <OfferPriceRef
          data={data?.productOfferingPrice ?? []}
          saveAction={onSavePrice}
          clickPrevious={onClickPrevious}
        />
      ),
    },
    {
      key: "8",
      label: (
        <>
          <DeploymentUnitOutlined />
          <i>Relationships</i>
        </>
      ),
      children: (
        <OfferingRelationship
          data={data?.productOfferingRelationship ?? []}
          saveAction={onSaveRelationship}
          clickPrevious={onClickPrevious}
        />
      ),
    },
    {
      key: "9",
      label: (
        <>
          <SnippetsOutlined />
          <i>Terms</i>
        </>
      ),
      children: (
        <OfferingTerm
          data={data?.productOfferingTerm ?? []}
          saveAction={onSaveTerms}
          clickPrevious={onClickPrevious}
        />
      ),
    },
  ];

  return loading === true ? (
    <p>Loading</p>
  ) : (
    <Tabs
      defaultActiveKey="1"
      items={items}
      activeKey={activeKey}
      onChange={handleChange}
    />
  );
};

export default SpecificationView;
