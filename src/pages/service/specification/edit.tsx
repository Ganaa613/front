import { editMeta } from "@/forms/service/specification";
import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import { common, engages_party, resource, service } from "@mobicom/tmf-dti";
import { Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import DetailComponent from "@/components/app-form/details";
import { useParams } from "react-router-dom";
import RelatedPartyRef from "@/refs/service/related-party";
import { getData, getValidForToObject } from "@/constants/converter";
import CharacteristicSpec from "@/components/app-char-spec";
// import SpecRelationship from "@/components/app-spec-rel";
import ServiceSpecRelRef from "@/refs/service/spec-rel";
import ResourceSpecRef from "@/refs/resource/spec";
import dayjs from "dayjs";

export const SpecificationView: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<service.Specification>();
  const [activeKey, setActiveKey] = useState<string>("0");

  async function find() {
    try {
      setLoading(true);
      const resp = await httpService.get<service.Specification>(
        `/service-catalog/specification/${params.id}`
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

  const onSaveDetail = async (values: service.Specification) => {
    try {
      values.validFor = getValidForToObject(values.validFor) ?? {};
      values.lastUpdate = dayjs(new Date())
        .format("YYYY-MM-DDThh:mm:ss.sZ")
        .toString();
      const resp = await httpService.patch(
        `/service-catalog/specification/${params.id}`,
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
      const resp = await httpService.patch<service.Catalog>(
        `/service-catalog/specification/${params.id}`,
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

  const onSaveServiceSpecChar = async (
    service: common.CharacteristicSpecification[]
  ) => {
    try {
      const resp = await httpService.patch(
        `/service-catalog/specification/${params.id}`,
        {
          data: {
            serviceSpecCharacteristic: service,
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

  const onSaveServiceSpecRelationship = async (
    service: service.ServiceSpecificationRelationship[]
  ) => {
    try {
      const resp = await httpService.patch(
        `/service-catalog/specification/${params.id}`,
        {
          data: {
            serviceSpecRelationship: service,
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
        `/service-catalog/specification/${params.id}`,
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
          saveAction={onSaveParty}
          clickPrevious={onClickPrevious}
          loading={loading}
        />
      ),
    },
    {
      key: "2",
      label: "Service Spec Characteristic",
      children: (
        <CharacteristicSpec
          data={data?.serviceSpecCharacteristic ?? []}
          saveAction={onSaveServiceSpecChar}
          clickPrevious={onClickPrevious}
        />
      ),
    },
    {
      key: "3",
      label: "Service Spec Relationship",
      children: (
        <ServiceSpecRelRef
          data={data?.serviceSpecRelationship ?? []}
          saveAction={onSaveServiceSpecRelationship}
          clickPrevious={onClickPrevious}
          loading={loading}
        />
      ),
    },
    {
      key: "4",
      label: "Resource Specification",
      children: (
        <ResourceSpecRef
          data={data?.resourceSpecification || []}
          saveAction={onSaveResourceSpec}
          clickPrevious={onClickPrevious}
          loading={loading}
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
