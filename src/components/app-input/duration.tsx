import { DURATION_OPTIONS } from "@/constants";
import { common } from "@mobicom/tmf-dti";
import { Col, InputNumber, Row, Select } from "antd";

const Option = Select.Option;

type DurationInputProps = {
  value: common.Duration;
  onChange: (v: common.Duration) => void;
};

const DurationInput: React.FC<DurationInputProps> = ({ value, onChange }) => {
  return value ? (
    <Row>
      <Col>
        <InputNumber
          addonAfter={
            <Select
              optionFilterProp="children"
              size="middle"
              style={{ width: 80 }}
              value={value.units}
              onChange={(v) => onChange({ amount: value.amount, units: v })}
            >
              {Object.values(DURATION_OPTIONS).map((e) => {
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

export default DurationInput;
