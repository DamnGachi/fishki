import { Button, Form, Input, Table } from "antd";
import { FC } from "react";

const columns = [
  {
    title: "Кадастровый номер",
    dataIndex: "number",
  },
  {
    title: "Адрес объекта",
    dataIndex: "address",
  },
  {
    title: "Тип",
    dataIndex: "type",
  },
  {
    title: "Площадь",
    dataIndex: "squary",
  },
  {
    title: "Дата добавления",
    dataIndex: "adding_date",
  },
  {
    title: "Дата окончания",
    dataIndex: "ending_date",
  },
];

const dataSource = [
  {
    key: "1",
    number: "77:01:0001014:1870",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

export const Objects: FC = () => {
  const [filtersForm] = Form.useForm();

  return (
    <div style={{ display: "flex" }}>
      <div style={{ padding: "30px" }}>
        <div style={{ position: "fixed" }}>
          <h5>Обновлено: 13 февраля</h5>
          <h2>Реестр объектов</h2>
          <Form form={filtersForm} style={{ display: "flex", gap: 10 }}>
            <Form.Item name="q">
              <Input placeholder="Начните поиск" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Искать
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="button"
                onClick={() => {
                  filtersForm.resetFields();
                }}
              >
                Сбросить
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ paddingTop: 200 }}>
          <Table columns={columns} />
        </div>
      </div>
    </div>
  );
};
