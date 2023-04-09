import { CloseCircleOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "dayjs/locale/ru";
import ruRU from "antd/es/date-picker/locale/ru_RU";
import axios from "axios";
import appState from "../store/appState";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRegistryItems: Dispatch<SetStateAction<any[]>>;
  itemData: any;
  setActiveItemData: any;
  setActiveDetailItem: any;
}

const regionOptions = [
  {
    label: "Хакасия",
    value: "Хакасия",
  },
  {
    label: "Краснодарский край",
    value: "Краснодарский край",
  },
  {
    label: "Алтайский край",
    value: "Алтайский край",
  },
  {
    label: "Тверская область",
    value: "Тверская область",
  },
  {
    label: "Северная Осетия",
    value: "Северная Осетия",
  },
];

export const EditObjectPopup: FC<IProps> = ({
  isOpen,
  setIsOpen,
  setRegistryItems,
  itemData,
  setActiveDetailItem,
  setActiveItemData,
}) => {
  const [popupForm] = useForm();

  useEffect(() => {
    popupForm.resetFields();
  }, [itemData, popupForm]);

  const handleFormSubmit = async (values: any) => {
    try {
      const updateRequest = await axios.post(
        `http://127.0.0.1:8090/api/service/registry/${itemData.id}/update/`,
        {
          ...values,
          id: itemData.id,
          userId: appState.userId,
          Owners: values.Owners.map((owner: any) => ({
            ...owner,
            id: owner.id ? owner.id : null,
          })),
        }
      );

      if (updateRequest.status === 200) {
        setIsOpen(false);
        message.success("Объект изменен");
        popupForm.resetFields();

        setActiveDetailItem(null);
        setActiveItemData(null);

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
      }
    } catch {
      message.error("Произошла ошибка при обновлении элемента");
    }
  };

  return (
    <Drawer
      title="Редактирование объекта"
      open={isOpen}
      placement="top"
      onClose={() => setIsOpen(false)}
      closeIcon={<CloseCircleOutlined />}
      height={"100vh"}
      extra
    >
      <Form
        form={popupForm}
        onFinish={handleFormSubmit}
        initialValues={{ ...itemData }}
      >
        <h3>Данные об объекте</h3>

        <div
          className="object-request-popup-form-grid"
          style={{ display: "grid", gap: 15 }}
        >
          <Form.Item
            label="Кадастровый номер"
            className="column-label-input"
            name="cadastralNumber"
            rules={[
              { required: true, message: "Поле обязательно" },
              { min: 17, message: "Некорректное количество символов" },
              { max: 18, message: "Некорректное количество символов" },
            ]}
            style={{ gridArea: "a" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Регион"
            className="column-label-input"
            name="region"
            rules={[{ required: true, message: "Поле обязательно" }]}
            style={{ gridArea: "b" }}
          >
            <Select options={regionOptions} />
          </Form.Item>
          <Form.Item
            label="Полный адрес"
            className="column-label-input"
            name="address"
            rules={[{ required: true, message: "Поле обязательно" }]}
            style={{ gridArea: "c" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Кадастровый район"
            className="column-label-input"
            name="cadastralDoc"
            rules={[{ required: true, message: "Поле обязательно" }]}
            style={{ gridArea: "d" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Тип объекта"
            className="column-label-input"
            name="type"
            rules={[{ required: true, message: "Поле обязательно" }]}
            style={{ gridArea: "e" }}
          >
            <Select
              options={[
                {
                  label: "Помещение",
                  value: "Помещение",
                },
                {
                  label: "Земельный участок",
                  value: "Земельный участок",
                },
                {
                  label: "Здание",
                  value: "Здание",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Адрес по документам"
            className="column-label-input"
            name="addressDoc"
            rules={[{ required: true, message: "Поле обязательно" }]}
            style={{ gridArea: "f" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Почтовый индекс"
            className="column-label-input"
            name="indexMail"
            rules={[{ required: true, message: "Поле обязательно" }]}
            style={{ gridArea: "g" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Площадь (м2)"
            className="column-label-input"
            name="space"
            rules={[{ required: true, message: "Поле обязательно" }]}
            style={{ gridArea: "h" }}
          >
            <InputNumber style={{ minWidth: "10vw" }} />
          </Form.Item>
          <Form.Item
            label="Этаж"
            className="column-label-input"
            name="floor"
            style={{ gridArea: "i" }}
          >
            <Select
              options={[
                {
                  label: "0",
                  value: "0",
                },
                {
                  label: "1",
                  value: "1",
                },
                {
                  label: "2",
                  value: "2",
                },
                {
                  label: "3",
                  value: "3",
                },
                {
                  label: "4",
                  value: "4",
                },
                {
                  label: "5",
                  value: "5",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Категория земель"
            className="column-label-input"
            name="category"
            style={{ gridArea: "j" }}
          >
            <Select
              options={[
                {
                  label: "Неизвестно",
                  value: "Неизвестно",
                },
                {
                  label: "Известно",
                  value: "Известно",
                },
              ]}
            />
          </Form.Item>
        </div>

        <Divider />

        <h3>Данные о владельцах</h3>

        <div>
          <Form.List name="Owners">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                      justifyContent: "stretch",
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      className="column-label-input"
                      label="ФИО Владельца"
                      name={[name, "fio"]}
                      rules={[{ required: true, message: "Поле обязательно" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className="column-label-input"
                      label="Федеральный закон"
                      name={[name, "fsId"]}
                      rules={[{ required: true, message: "Поле обязательно" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className="column-label-input"
                      label="Номер свидетельства о регистрации"
                      name={[name, "registrationCertificate"]}
                      rules={[{ required: true, message: "Поле обязательно" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className="column-label-input"
                      label="Дата регистрации"
                      name={[name, "registration_date"]}
                      rules={[{ required: true, message: "Поле обязательно" }]}
                    >
                      <DatePicker
                        placeholder=""
                        locale={ruRU}
                        format={"DD/MM/YYYY"}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    style={{ width: "20%" }}
                  >
                    Добавить владельца
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 20 }}>
          <Button htmlType="button" onClick={() => setIsOpen(false)}>
            Отменить
          </Button>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Подтвердить
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  );
};
