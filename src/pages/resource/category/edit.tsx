import React, { useEffect, useState } from "react";
import { TabsProps, Tabs } from "antd";
import { useParams } from "react-router-dom";
import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import { common, engages_party, resource } from "@mobicom/tmf-dti";
import { editMeta } from "@/forms/resource/category";
import DetailComponent from "@/components/app-form/details";
import { getData, getValidForToObject } from "@/constants/converter";
import RelatedPartyRef from "@/refs/related-party";
import { CategoryRef } from "@/refs";
import ExternalIdentifier from "@/refs/external-identifier";
import ResourceSpecRef from "@/refs/resource/spec";
import ResourceCandidateRef from "@/refs/resource/candidate";
import dayjs from "dayjs";

const CategoryView: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<resource.Category>();
  const [activeKey, setActiveKey] = useState<string>("0");

  async function find() {
    try {
      setLoading(true);
      const resp = await httpService.get<resource.Category>(
        `/resource-catalog/category/${params.id}`
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

  const onSaveDetails = async (values: resource.Category) => {
    try {
      values.validFor = getValidForToObject(values.validFor) ?? {};
      values.lastUpdate = dayjs(new Date())
        .format("YYYY-MM-DDThh:mm:ss.sZ")
        .toString();
      const resp = await httpService.patch<resource.Category>(
        `/resource-catalog/category/${params.id}`,
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
        `/resource-catalog/category/${params.id}`,
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

  const onSaveCategory = async (categories: resource.CategoryRef[]) => {
    try {
      const resp = await httpService.patch<resource.Catalog>(
        `/resource-catalog/category/${params.id}`,
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

  const onSaveExternalIdentifier = async (
    externalIdentifier: common.ExternalIdentifier[]
  ) => {
    try {
      const resp = await httpService.patch<resource.Catalog>(
        `/resource-catalog/category/${params.id}`,
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

  const onSaveResourceSpec = async (
    resource: resource.ResourceSpecificationRef[]
  ) => {
    try {
      const resp = await httpService.patch(
        `/resource-catalog/category/${params.id}`,
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

  const onSaveResourceCandidate = async (
    resource: resource.ResourceCandidateRef[]
  ) => {
    try {
      const resp = await httpService.patch(
        `/resource-catalog/category/${params.id}`,
        {
          data: {
            resourceCandidate: resource,
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
      label: "Category",
      children: (
        <CategoryRef
          data={data?.category || []}
          saveAction={onSaveCategory}
          clickPrevious={onClickPrevious}
          loading={loading}
          type={"resource"}
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
    {
      key: "5",
      label: "Resource Candidate",
      children: (
        <ResourceCandidateRef
          data={data?.resourceCandidate || []}
          saveAction={onSaveResourceCandidate}
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
