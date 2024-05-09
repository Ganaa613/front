import React from "react";
import { Space } from "antd";
import DeleteActionComponent from "./delete";
import ViewActionComponent from "./view";

type ComponentProps = {
  viewAction?: () => void;
  deleteAction: () => void;
};

const Component: React.FC<ComponentProps> = ({ viewAction, deleteAction }) => {
  return (
    <Space size="middle">
      {viewAction && <ViewActionComponent viewAction={viewAction} />}
      <DeleteActionComponent deleteAction={deleteAction} />
    </Space>
  );
};

export default Component;
