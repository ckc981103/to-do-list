import React, { useState, useEffect } from "react";
import { List, Typography, Button, Modal, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Duty, deleteOne, updateOne } from "../api/duty";

type FieldType = {
  duty: string;
};

const ListDuties: React.FC<{
  dataSource: Duty[];
  loading: boolean;
  refresh: () => Promise<void>;
}> = ({ dataSource, loading, refresh }) => {
  const [form] = Form.useForm();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<string>("");
  const [defaultDuty, setDefaultDuty] = useState("");

  useEffect(() => {
    form.setFieldsValue({ duty: defaultDuty });
  }, [form, defaultDuty]);

  const handleUpdate = async (value: FieldType) => {
    await updateOne(updatingId, value.duty);
    await refresh();
    setIsUpdateModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    await deleteOne(id);
    await refresh();
  };
  return (
    <>
      <List
        loading={loading}
        header={<div style={{ fontSize: "18px" }}>Duties List</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text style={{ width: "80%" }}>
              {item.name}
            </Typography.Text>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setDefaultDuty(item.name);
                setUpdatingId(item.id);
                setIsUpdateModalOpen(true);
              }}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(item.id)}
            />
          </List.Item>
        )}
      />

      <Modal
        title="Update Duty"
        open={isUpdateModalOpen}
        // onOk={handleOk}
        onCancel={() => setIsUpdateModalOpen(false)}
        footer={[
          <Button form="updateForm" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form
          id="updateForm"
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          autoComplete="off"
          initialValues={{
            duty: defaultDuty,
          }}
          onFinish={handleUpdate}
        >
          <Form.Item<FieldType>
            label="Update Duty Name"
            name="duty"
            rules={[{ required: true, message: "Please input your duty!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListDuties;
