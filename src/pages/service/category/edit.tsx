import React, { useEffect, useState } from "react";
import { TabsProps, Tabs } from "antd";
import { useParams } from "react-router-dom";
import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import { service } from "@mobicom/tmf-dti";
import { editMeta } from "@/forms/service/category";
import DetailComponent from "@/components/app-form/details";
import { getData, getValidForToObject } from "@/constants/converter";
import { CategoryRef } from "@/refs";
import ServiceCandidateRef from "@/refs/service/candidate";
import dayjs from "dayjs";

const CategoryView: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<service.Category>();
  const [activeKey, setActiveKey] = useState<string>("0");

  async function find() {
    try {
      setLoading(true);
      const resp = await httpService.get<service.Category>(
        `/service-catalog/category/${params.id}`
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

  const onSaveDetails = async (values: service.Category) => {
    try {
      values.validFor = getValidForToObject(values.validFor) ?? {};
      values.lastUpdate = dayjs(new Date())
        .format("YYYY-MM-DDThh:mm:ss.sZ")
        .toString();
      const resp = await httpService.patch<service.Category>(
        `/service-catalog/category/${params.id}`,
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

  const onSaveCategory = async (categories: service.CategoryRef[]) => {
    try {
      const resp = await httpService.patch<service.Catalog>(
        `/service-catalog/category/${params.id}`,
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

  const onSaveServiceCandidate = async (
    candidates: service.ServiceCandidateRef[]
  ) => {
    try {
      const resp = await httpService.patch(
        `/service-catalog/category/${params.id}`,
        {
          data: {
            serviceCandidate: candidates,
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
      label: "Category",
      children: (
        <CategoryRef
          data={data?.category || []}
          saveAction={onSaveCategory}
          clickPrevious={onClickPrevious}
          loading={loading}
          type={"service"}
        />
      ),
    },
    {
      key: "2",
      label: "Service Candidate",
      children: (
        <ServiceCandidateRef
          data={data?.serviceCandidate || []}
          saveAction={onSaveServiceCandidate}
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
