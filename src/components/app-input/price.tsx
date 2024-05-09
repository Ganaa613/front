import { PRICE_OPTIONS } from "@/constants";
import { common } from "@mobicom/tmf-dti";
import { Col, InputNumber, Row, Select } from "antd";

const Option = Select.Option;

type PriceInputProps = {
  value: common.Money;
  onChange: (v: common.Money) => void;
};

const PriceInput: React.FC<PriceInputProps> = ({ value, onChange }) => {
  return value ? (
    <Row>
      <Col>
        <InputNumber
          addonAfter={
            <Select
              value={value.unit}
              onChange={(v) => onChange({ value: value.value, unit: v })}
            >
              {Object.values(PRICE_OPTIONS).map((e) => {
                return (
                  <Option key={e} value={e}>
                    {e}
                  </Option>
                );
              })}
            </Select>
          }
          value={value.value}
          onChange={(v) => onChange({ value: Number(v), unit: value.unit })}
        />
      </Col>
    </Row>
  ) : null;
};

export default PriceInput;
