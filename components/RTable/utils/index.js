import React from "react";
import {
  DatePicker,
  InputGroup,
  RangeSlider,
  Row,
  Col,
  InputNumber,
  CheckPicker,
} from "rsuite";
export const AmountRangePicker = () => {
  const [value, setValue] = React.useState([10, 50]);
  return (
    <div className="col-sm-6 mt-4">
      <h6 className="">Choose amount range</h6>
      <Row>
        <Col md={10}>
          <RangeSlider
            progress
            style={{ marginTop: 16 }}
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </Col>
        <Col md={8}>
          <InputGroup>
            <InputNumber
              min={0}
              max={100}
              value={value[0]}
              onChange={(nextValue) => {
                const [start, end] = value;
                if (nextValue > end) {
                  return;
                }
                setValue([nextValue, end]);
              }}
            />
            <InputGroup.Addon>to</InputGroup.Addon>
            <InputNumber
              min={0}
              max={100}
              value={value[1]}
              onChange={(nextValue) => {
                const [start, end] = value;
                if (start > nextValue) {
                  return;
                }
                setValue([start, nextValue]);
              }}
            />
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

export const DateRangePicker = ({ column: { Header, setFilter } }) => {
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const manageChange = (val) => {
    if (val.length === 0 || !val[0] || !val[1]) {
      setFilter([]);
    } else {
      setFilter(() => [
        val ? Date.parse(val[0]) : Date.now(),
        Date.parse(val[1]) || Date.now(),
      ]);
    }
  };
  return (
    <div className="col-sm-3 mt-4 date-range-picker">
      <h6 className="">{Header}</h6>
      <InputGroup className="date-range-picker-group">
        <DatePicker
          placeholder="Start Date"
          className="col-sm-6"
          block
          appearance="subtle"
          onChange={(e) => {
            manageChange([e, end]);
            setStart(e);
          }}
        />
        <InputGroup.Addon className="divider" />
        <DatePicker
          placeholder="End Date"
          className="col-sm-6"
          block
          appearance="subtle"
          onChange={(e) => {
            manageChange([start, e]);
            setEnd(e);
          }}
        />
      </InputGroup>
    </div>
  );
};

export const ExcludeCell = (props) => {
  const {
    value: initialValue = '[]',
    row: { index, values },
    column: { id, dataId },
    updateMyData,
  } = props;
  const data = values[dataId] || "[]";
  const handleExclude = e => {
    updateMyData(index, id, JSON.stringify(e))
  }

  return (
    <div className="editable-select-container">
      <CheckPicker
        data={JSON.parse(data)}
        value={JSON.parse(initialValue)}
        onChange={handleExclude}
        style={{ width: 224 }}
      />
    </div>
  );
};
export const ExcludeCell2 = (props) => {
  const {
    value: initialValue = [],
    row: { index, values },
    column: { id, dataId },
    updateMyData,
  } = props;
  const data = values[dataId] || [];
  const handleExclude = e => {
    updateMyData(index, id, e)
  }

  return (
    <div className="editable-select-container">
      <CheckPicker
        data={data}
        value={initialValue}
        onChange={handleExclude}
        style={{ width: 224 }}
      />
    </div>
  );
};
