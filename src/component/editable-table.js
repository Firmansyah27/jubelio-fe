import { Button, Table, Form, Input } from "antd";
import { useState } from "react";

const EditableTable = ({ data, CustomPagination, onDataChange })=> {
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "SKU",
      dataIndex: "sku",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item 
              name="sku"
              rules={[
                {
                  required: true,
                  message: "Please enter sku",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="image">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="price">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="description">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Actions",
      width: "5%",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  name: record.name,
                  sku: record.sku,
                  image: record.image,
                  price: record.price,
                  description: record.description,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      },
    },
  ];
  const onFinish = (values) => {
    const updatedDataSource = [...data];
    const newUpdatedData = updatedDataSource.map((obj) => {
      if( obj.key == editingRow) {
        return { ...values, key: editingRow }
      }
      return obj
    });
    onDataChange(newUpdatedData);
    setEditingRow(null);
  };
  return (
    <div className="App">
      <Form form={form} onFinish={onFinish}>
        <Table columns={columns} dataSource={data} pagination={false}></Table>
        {CustomPagination}
      </Form>
    </div>
  );
}

export default EditableTable;