import React from "react";
import { Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

type ComponentProps = {
  viewAction: () => void;
};

const Component: React.FC<ComponentProps> = ({ viewAction }) => {
  return (
    <a>
      <Tooltip title="Edit item">
        <EditOutlined onClick={viewAction} />
      </Tooltip>
    </a>
  );
};

export default Component;
