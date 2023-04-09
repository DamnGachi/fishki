import { ArrowRightOutlined } from "@ant-design/icons";
import { Map, YMaps, Placemark } from "@pbe/react-yandex-maps";
import { Button, Divider, Menu } from "antd";
import classNames from "classnames";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface IProps {
  activeDetailItem: any;
  activeItemData: any;
  setActiveDetailItem: Dispatch<SetStateAction<any>>;
  setActiveItemData: Dispatch<SetStateAction<any>>;
}

const DetailItem: FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div>
      <p style={{ opacity: 0.4, fontSize: 12, lineHeight: "15px" }}>{label}</p>
      <p>{value}</p>
    </div>
  );
};

export const RegistryDetailModal: FC<IProps> = ({
  activeDetailItem,
  activeItemData,
  setActiveDetailItem,
  setActiveItemData,
}) => {
  const [activeTab, setActiveTab] = useState("main");

  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        overflow: "auto",
        top: "0",
        right: 0,
        background: "#fff",
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

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                width: "auto",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {activeItemData.address}
            </h1>
            <Button disabled style={{ marginLeft: 30 }}>
              Редактировать карточку объекта
            </Button>
          </div>

          <Menu
            mode="horizontal"
            defaultSelectedKeys={["main"]}
            selectedKeys={[activeTab]}
            onClick={(e) => {
              setActiveTab(e.key);
            }}
            items={[
              {
                label: "Основная информация",
                key: "main",
              },
              {
                label: "Фото и документы",
                key: "attached",
              },
              {
                label: "Лог событий по объекту",
                key: "logs",
              },
            ]}
          />

          {activeTab === "main" && (
            <div>
              <p>{activeItemData.updatedAt}</p>
              <h3>Анкета объекта</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <DetailItem label="Тип" value={activeItemData.type} />
                <DetailItem label="Регион" value={activeItemData.region} />
                <DetailItem
                  label="Кадастровый номер"
                  value={activeItemData.cadastralNumber}
                />
                <DetailItem
                  label="Кадастровый район"
                  value={activeItemData.address}
                />
                <DetailItem
                  label="Почтовый индекс"
                  value={activeItemData.indexMail}
                />
                <DetailItem label="Этаж" value={activeItemData.floor} />
                <div style={{ marginBottom: -18 }}>
                  <p style={{ opacity: 0.4, fontSize: 12, lineHeight: "15px" }}>
                    Статус
                  </p>
                  <p
                    className={classNames(
                      activeItemData.status.id === 1 && "new",
                      activeItemData.status.id === 2 && "wip",
                      activeItemData.status.id === 3 && "done"
                    )}
                    style={{
                      width: 200,
                      padding: "10px 20px",
                      textAlign: "center",
                    }}
                  >
                    {activeItemData.status.title}
                  </p>
                </div>
                <DetailItem
                  label="Полный адрес"
                  value={activeItemData.address}
                />
                <div></div>
                <DetailItem
                  label="Адрес по документам"
                  value={activeItemData.address}
                />
                <div></div>
                <DetailItem
                  label="Площадь"
                  value={`${activeItemData.space} м2`}
                />
                <div></div>
                <DetailItem
                  label="Категория земель"
                  value={activeItemData.type}
                />
              </div>

              <Divider />

              <h3>Информация о владельцах</h3>

              <div>
                {activeItemData.owners && activeItemData.owners.length ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                    }}
                  >
                    {activeItemData.owners.map((owner: any) => (
                      <>
                        <DetailItem value={owner.fio} label="ФИО Владельца" />
                        <DetailItem value={owner.rule} label="ФЗ" />
                        <DetailItem
                          value={owner.registration_number}
                          label="Свидетельство о регистрации"
                        />
                        <DetailItem
                          value={owner.registration_date}
                          label="Дата регистрации"
                        />
                      </>
                    ))}
                  </div>
                ) : (
                  <p>Информации нет</p>
                )}
              </div>

              {activeItemData.lat && activeItemData.long ? (
                <>
                  <Divider />

                  <h3>Объект на карте</h3>
                  <YMaps>
                    <Map
                      width={"calc(50vw - 210px)"}
                      height={400}
                      defaultState={{
                        center: [activeItemData.lat, activeItemData.long],
                        zoom: 9,
                      }}
                      children={[
                        <Placemark
                          defaultGeometry={[
                            activeItemData.lat,
                            activeItemData.long,
                          ]}
                        />,
                      ]}
                    />
                  </YMaps>
                </>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
