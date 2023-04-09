import { Button, Form, Input, message } from "antd";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { RegistryDetailModal } from "./RegistryDetailModal";
import axios from "axios";
import { NewObjectPopup } from "./NewObjectPopup";

export const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);

  return `${dateObj.getDate()}.${`${dateObj.getMonth() + 1}`.padStart(
    2,
    "0"
  )}.${`${dateObj.getFullYear()}`.padStart(2, "0")}`;
};

export const Registry: FC = () => {
  const [filtersForm] = Form.useForm();
  const [activeDetailItem, setActiveDetailItem] = useState<null | number>(null);
  const [activeItemData, setActiveItemData] = useState<null | any>(null);
  const [registryItems, setRegistryItems] = useState<any[]>([]);
  const [isNewObjectPopupOpen, setIsNewObjectPopupOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const contentRequest = await axios.get(
          "http://127.0.0.1:8090/api/service/registry/"
        );

        if (contentRequest.status === 200) {
          setRegistryItems(contentRequest.data);
        } else {
          message.error("Ошибка при загрузке элементов");
        }
      } catch {
        message.error("Ошибка при загрузке элементов");
      }
    })();
  }, []);

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
        <div
          style={{
            position: "fixed",
            top: 0,
            zIndex: 1,
            background: "rgb(244, 244, 244)",
            width:
              activeDetailItem !== null
                ? "calc(50vw - 210px)"
                : "calc(100vw - 360px)",
            transition: "0.4s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h5>Обновлено: 13 февраля</h5>
              <h2>Реестр объектов</h2>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Button
                onClick={() => {
                  setIsNewObjectPopupOpen(true);
                }}
              >
                Добавить объект
              </Button>
              <NewObjectPopup
                isOpen={isNewObjectPopupOpen}
                setIsOpen={setIsNewObjectPopupOpen}
                setRegistryItems={setRegistryItems}
              />
              <Button type="primary" disabled>
                Создать повестку
              </Button>
            </div>
          </div>
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
            <h4>Объектов найдено: {registryItems.length}</h4>
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
              {registryItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    if (activeDetailItem !== null) {
                      setActiveDetailItem(null);
                      setActiveItemData(null);
                    } else {
                      setActiveDetailItem(item.id);
                      setActiveItemData(item);
                    }
                  }}
                  className={classNames(
                    item.id === activeDetailItem && "active"
                  )}
                >
                  <td>{item.cadastralNumber}</td>
                  <td>{item.address}</td>
                  <td>{item.type}</td>
                  <td>{item.space}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td
                    className={classNames(
                      item.status.id === 1 && "new",
                      item.status.id === 2 && "wip",
                      item.status.id === 3 && "done"
                    )}
                    style={{ textAlign: "center" }}
                  >
                    {item.status.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <RegistryDetailModal
            activeDetailItem={activeDetailItem}
            activeItemData={activeItemData}
            setActiveDetailItem={setActiveDetailItem}
            setActiveItemData={setActiveItemData}
            setRegistryItems={setRegistryItems}
          />
        </div>
      </div>
    </div>
  );
};
