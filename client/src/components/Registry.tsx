import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table } from "antd";
import classNames from "classnames";
import { FC, useState } from "react";

const tableItems = [
  {
    key: 1,
    number: "77:01:0001014:1870",
    address: "ул. Конная, д. 5/3, 1",
    type: "Помещение",
    square: "134,6",
    registrationDate: "12.03.2014",
    region: 'Москва',
    status: "Новый",
    updatedAt: "Обновлена 24 февраля, 13:45",
    owners: [
      {
        fio: "Бондарь Евгений Максимович",
        rule: "218",
        registration_number: "№ 34-11-237/2008-411.3",
        registration_date: "20.11.2001",
      },
    ],
  },
  {
    key: 2,
    number: "77:01:0001014:1870",
    address: "ул. Конная, д. 5/3, 1",
    type: "Помещение",
    square: "134,6",
    registrationDate: "12.03.2014",
    region: 'Москва',
    status: "В работе",
    updatedAt: "Обновлена 24 февраля, 13:45",
    owners: [
      {
        fio: "Бондарь Евгений Максимович",
        rule: "218",
        registration_number: "№ 34-11-237/2008-411.3",
        registration_date: "20.11.2001",
      },
    ],
  },
  {
    key: 3,
    number: "77:01:0001014:1870",
    address: "ул. Конная, д. 5/3, 1",
    type: "Помещение",
    square: "134,6",
    registrationDate: "12.03.2014",
    region: 'Москва',
    status: "Работа завершена",
    updatedAt: "Обновлена 24 февраля, 13:45",
    owners: [
      {
        fio: "Бондарь Евгений Максимович",
        rule: "218",
        registration_number: "№ 34-11-237/2008-411.3",
        registration_date: "20.11.2001",
      },
    ],
  },
  {
    key: 4,
    number: "77:01:0001014:1870",
    address: "ул. Конная, д. 5/3, 1",
    type: "Помещение",
    square: "134,6",
    registrationDate: "12.03.2014",
    status: "Новый",
    region: 'Москва',
    updatedAt: "Обновлена 24 февраля, 13:45",
    owners: [
      {
        fio: "Бондарь Евгений Максимович",
        rule: "218",
        registration_number: "№ 34-11-237/2008-411.3",
        registration_date: "20.11.2001",
      },
    ],
  },
  {
    key: 5,
    number: "77:01:0001014:1870",
    address: "ул. Конная, д. 5/3, 1",
    type: "Помещение",
    square: "134,6",
    region: 'Москва',
    registrationDate: "12.03.2014",
    status: "Новый",
    updatedAt: "Обновлена 24 февраля, 13:45",
    owners: [
      {
        fio: "Бондарь Евгений Максимович",
        rule: "218",
        registration_number: "№ 34-11-237/2008-411.3",
        registration_date: "20.11.2001",
      },
    ],
  },
];

export const Registry: FC = () => {
  const [filtersForm] = Form.useForm();
  const [activeDetailItem, setActiveDetailItem] = useState<null | number>(null);
  const [activeItemData, setActiveItemData] = useState<null | any>(null);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          padding: "30px",
          width: activeDetailItem !== null ? "50%" : "100%",
          transition: "0.4s",
          position: "relative",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <div style={{ position: "fixed" }}>
          <h5>Обновлено: 13 февраля</h5>
          <h2>Реестр объектов</h2>
          <Form form={filtersForm} style={{ display: "flex", gap: 10 }}>
            <Form.Item name="q">
              <Input placeholder="Начните поиск" style={{ width: 400 }} />
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h4>Объектов найдено: {tableItems.length}</h4>
            <Button disabled>Выгрузить отчет</Button>
          </div>
        </div>
        <div style={{ paddingTop: 200 }} className="registry-table">
          <table>
            <tbody>
              <tr className="header">
                <td>Кадастровый номер</td>
                <td>Адрес объекта</td>
                <td>Тип</td>
                <td>Площадь</td>
                <td>На учёте с</td>
                <td>Статус</td>
              </tr>
              {tableItems.map((item) => (
                <tr
                  key={item.key}
                  onClick={() => {
                    if (activeDetailItem !== null) {
                      setActiveDetailItem(null);
                      setActiveItemData(null);
                    } else {
                      setActiveDetailItem(item.key);
                      setActiveItemData(item);
                    }
                  }}
                  className={classNames(
                    item.key === activeDetailItem && "active"
                  )}
                >
                  <td>{item.number}</td>
                  <td>{item.address}</td>
                  <td>{item.type}</td>
                  <td>{item.square}</td>
                  <td>{item.registrationDate}</td>
                  <td
                    className={classNames(
                      item.status === "Новый" && "new",
                      item.status === "В работе" && "wip",
                      item.status === "Работа завершена" && "done"
                    )}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              position: "fixed",
              height: "100%",
              top: "0",
              right: 0,
              width: "calc(50vw - 150px)",
              transform: `translateX(${
                activeDetailItem !== null ? "0" : "calc(50vw - 150px)"
              })`,
              transition: ".4s",
              padding: 30,
            }}
          >
            {activeItemData && (
              <div>
                <Button
                  icon={<ArrowRightOutlined />}
                  onClick={() => {
                    setActiveDetailItem(null);
                    setActiveItemData(null);
                  }}
                >
                  Скрыть страницу объекта
                </Button>
                <p>{activeItemData.updatedAt}</p>
                <h3>Анкета объекта</h3>
                <div
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                >
                  <div>
                    <p
                      style={{ opacity: 0.4, fontSize: 12, lineHeight: "15px" }}
                    >
                      Тип
                    </p>
                    <p>{activeItemData.type}</p>
                  </div>
                  <div>
                    <p
                      style={{ opacity: 0.4, fontSize: 12, lineHeight: "15px" }}
                    >
                      Регион
                    </p>
                    <p>{activeItemData.region}</p>
                  </div>
                  <div>
                    <p
                      style={{ opacity: 0.4, fontSize: 12, lineHeight: "15px" }}
                    >
                      Кадастровый номер
                    </p>
                    <p>{activeItemData.number}</p>
                  </div>
                  <div>
                    <p
                      style={{ opacity: 0.4, fontSize: 12, lineHeight: "15px" }}
                    >
                      Кадастровый район
                    </p>
                    <p>{activeItemData.address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
