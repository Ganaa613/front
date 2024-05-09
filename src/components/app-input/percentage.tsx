import { Col, InputNumber, Row, Slider } from "antd";
import { useState } from "react";

type PercentageInputProps = {
  value: string;
  onChange: (v: number) => void;
};

const PercentageInput: React.FC<PercentageInputProps> = ({
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const change = (newValue: number) => {
    setInputValue(newValue + "");
    onChange(newValue);
  };

  return (
    <Row>
      <Col span={16}>
        <Slider
          min={0}
          max={100}
          onChange={(v) => change(v as number)}
          value={typeof inputValue === "number" ? Number(inputValue) : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={100}
          value={Number(inputValue)}
          onChange={(v) => change(v as number)}
        />
      </Col>
    </Row>
  );
};

export default PercentageInput;
