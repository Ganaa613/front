import { editMeta } from "@/forms/resource/specification";
import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import { common, engages_party, resource } from "@mobicom/tmf-dti";
import { Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import DetailComponent from "@/components/app-form/details";
import { useParams } from "react-router-dom";
import RelatedPartyRef from "@/refs/related-party";
import { getData, getValidForToObject } from "@/constants/converter";
import CharacteristicSpec from "@/components/app-char-spec";
// import SpecRelationship from "@/components/app-spec-rel";
import ExternalIdentifier from "@/refs/external-identifier";
import ResourceSpecRelRef from "@/refs/resource/spec-rel";
import dayjs from "dayjs";

export const SpecificationView: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<resource.Specification>();
  const [activeKey, setActiveKey] = useState<string>("0");

  async function find() {
    try {
      setLoading(true);
      const resp = await httpService.get<resource.Specification>(
        `/resource-catalog/specification/${params.id}`
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

  const onSaveDetail = async (values: resource.Specification) => {
    try {
      values.validFor = getValidForToObject(values.validFor) ?? {};
      values.lastUpdate = dayjs(new Date())
        .format("YYYY-MM-DDThh:mm:ss.sZ")
        .toString();
      const resp = await httpService.patch(
        `/resource-catalog/specification/${params.id}`,
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
      const resp = await httpService.patch<resource.Catalog>(
        `/resource-catalog/specification/${params.id}`,
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

  const onSaveResourceSpecChar = async (
    resource: common.CharacteristicSpecification[]
  ) => {
    try {
      const resp = await httpService.patch(
        `/resource-catalog/specification/${params.id}`,
        {
          data: {
            resourceSpecCharacteristic: resource,
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

  const onSaveResourceSpecRelationship = async (
    resource: resource.ResourceSpecificationRelationship[]
  ) => {
    try {
      const resp = await httpService.patch(
        `/resource-catalog/specification/${params.id}`,
        {
          data: {
            resourceSpecRelationship: resource,
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

  const onSaveExternalIdentifier = async (
    externalIdentifier: common.ExternalIdentifier[]
  ) => {
    try {
      const resp = await httpService.patch<resource.Catalog>(
        `/resource-catalog/specification/${params.id}`,
        {
          data: {
            externalIdentifier: externalIdentifier,
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
      label: "Resource Spec Characteristic",
      children: (
        <CharacteristicSpec
          data={data?.resourceSpecCharacteristic ?? []}
          saveAction={onSaveResourceSpecChar}
          clickPrevious={onClickPrevious}
        />
      ),
    },
    {
      key: "3",
      label: "External Identifier",
      children: (
        <ExternalIdentifier
          data={data?.externalIdentifier || []}
          saveAction={onSaveExternalIdentifier}
          clickPrevious={onClickPrevious}
          loading={loading}
        />
      ),
    },
    {
      key: "4",
      label: "Resource Spec Relationship",
      children: (
        // <SpecRelationship
        //   data={data?.resourceSpecRelationship ?? []}
        //   saveAction={onSaveResourceSpecRelationship}
        //   clickPrevious={onClickPrevious}
        // />
        <ResourceSpecRelRef
          data={data?.resourceSpecRelationship ?? []}
          saveAction={onSaveResourceSpecRelationship}
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
