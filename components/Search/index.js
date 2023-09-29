import { Button, Col, Form, Input, Row } from "antd";

const getFields = (fields) => {
  const children = fields.map((field, i) => {
    return (
      <Col span={8} key={i}>
        <Form.Item
          name={field.name}
          label={field.label}
          rules={[
            {
              required: field.required,
              message: "Input something!",
            },
          ]}
        >
          <Input placeholder={field.label} />
        </Form.Item>
      </Col>
    );
  });

  return children;
};

export default function Search({ fields = [{}, {}, {}, {}], onSearch = () => {}, loading }) {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="advanced_search"
      className="my-4"
      layout="vertical"
      onFinish={onSearch}
    >
      <Row gutter={24}>{getFields(fields)}</Row>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: "right",
          }}
        >
          <Button htmlType="submit" type="primary" loading={loading}>
            Search
          </Button>
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
