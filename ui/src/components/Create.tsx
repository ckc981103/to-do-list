import React from "react";
import { Button, Form, Input } from "antd";
import { createOne } from "../api/duty";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  duty: string;
};

const CreateDuty: React.FC<{ refresh: () => Promise<void> }> = ({
  refresh,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: FieldType) => {
    console.log("Success:", values);
    await createOne(values.duty);
    await refresh();
    form.resetFields();
  };
  return (
    <Form
      form={form}
      name="createForm"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Create New Duty"
        name="duty"
        rules={[{ required: true, message: "Please input your duty!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateDuty;
