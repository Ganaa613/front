import { QUANTITY_OPTIONS } from "@/constants";
import { common } from "@mobicom/tmf-dti";
import { Col, InputNumber, Row, Select } from "antd";

const Option = Select.Option;

type QuantityInputProps = {
  value: common.Quantity;
  onChange: (v: common.Quantity) => void;
};

const QuantityInput: React.FC<QuantityInputProps> = ({ value, onChange }) => {
  return value ? (
    <Row>
      <Col>
        <InputNumber
          addonAfter={
            <Select
              value={value.units}
              onChange={(v) => onChange({ amount: value.amount, units: v })}
            >
              {Object.values(QUANTITY_OPTIONS).map((e) => {
                return (
                  <Option key={e} value={e}>
                    {e}
                  </Option>
                );
              })}
            </Select>
          }
          value={value.amount}
          onChange={(v) => onChange({ amount: Number(v), units: value.units })}
        />
      </Col>
    </Row>
  ) : null;
};

export default QuantityInput;
