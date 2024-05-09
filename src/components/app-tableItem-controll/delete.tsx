import React from "react";
import { Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type ComponentProps = {
  deleteAction: () => void;
};

const Component: React.FC<ComponentProps> = ({ deleteAction }) => {
  return (
    <a>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={deleteAction}
        okText="Yes"
        cancelText="No"
      >
        <Tooltip title="Delete item">
          <DeleteOutlined color="red" />
        </Tooltip>
      </Popconfirm>
    </a>
  );
};

export default Component;
