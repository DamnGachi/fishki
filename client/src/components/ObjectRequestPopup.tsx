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
import { Dispatch, FC, SetStateAction } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "dayjs/locale/ru";
import ruRU from "antd/es/date-picker/locale/ru_RU";
import axios from "axios";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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

export const ObjectRequestPopup: FC<IProps> = ({ isOpen, setIsOpen }) => {
  const [popupForm] = useForm();

  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Drawer
      title="Запрос на внесение в реестр"
      open={isOpen}
      placement="top"
      onClose={() => setIsOpen(false)}
      closeIcon={<CloseCircleOutlined />}
      height={"100vh"}
      extra
    >
      <h1>Формирование запроса</h1>

      <Form form={popupForm} onFinish={handleFormSubmit}>
        <Divider />
        <h3>
          Данные об объекте (введите кадастровый номер для автозаполнения)
        </h3>

        <div
          className="object-request-popup-form-grid"
          style={{ display: "grid", gap: 15 }}
        >
          <Form.Item
            label="Кадастровый номер"
            className="column-label-input"
            name="number"
            rules={[
              { required: true, message: "Поле обязательно" },
              { min: 17, message: "Некорректное количество символов" },
              { max: 18, message: "Некорректное количество символов" },
            ]}
            style={{ gridArea: "a" }}
          >
            <Input
              onChange={(e) => {
                if (
                  e.target.value.length === 18 ||
                  e.target.value.length === 17
                ) {
                  (async () => {
                    try {
                      message.info(
                        "Автозаполнение по кадастровому номеру началось"
                      );

                      const autoCompleteRequest = await axios.get(
                        `http://127.0.0.1:8000/api/parser/${e.target.value}`
                      );

                      if (autoCompleteRequest.status === 200) {
                        popupForm.setFieldsValue({
                          region: autoCompleteRequest.data["Регион:"],
                          type: autoCompleteRequest.data["Тип:"],
                          full_address: `${autoCompleteRequest.data["Регион:"]}, ${autoCompleteRequest.data["Адрес:"]}`,
                          square: parseInt(
                            autoCompleteRequest.data[" Общая площадь: "]
                          ),
                        });

                        message.success("Автозаполнение данных завершено");

                        if (autoCompleteRequest.data["Этаж:"]) {
                          popupForm.setFieldsValue({
                            floor: autoCompleteRequest.data["Этаж:"],
                          });
                        }
                      } else {
                        message.error("Ошибка при автозаполнении");
                      }
                    } catch {
                      message.error("Ошибка при автозаполнении");
                    }
                  })();
                }
              }}
            />
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
            name="full_address"
            rules={[{ required: true, message: "Поле обязательно" }]}
            style={{ gridArea: "c" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Кадастровый район"
            className="column-label-input"
            name="cadaster_address"
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
            name="document_address"
            rules={[{ required: true, message: "Поле обязательно" }]}
            style={{ gridArea: "f" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Почтовый индекс"
            className="column-label-input"
            name="index"
            rules={[{ required: true, message: "Поле обязательно" }]}
            style={{ gridArea: "g" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Площадь (м2)"
            className="column-label-input"
            name="square"
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
          <Form.List name="owners">
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
                      name={[name, "rule"]}
                      rules={[{ required: true, message: "Поле обязательно" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className="column-label-input"
                      label="Номер свидетельства о регистрации"
                      name={[name, "registration_number"]}
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
              Отправить заявку
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  );
};
