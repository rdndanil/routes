import React, { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

const CreateZayavkaForm = () => {
  const [formData, setFormData] = useState({
    perevozchik: { name: "", address: "", inn: "", phone: "" },
    platelshik: {
      name: "ООО «КИТ.ТК»",
      address:
        "620085, Свердловская область, г. Екатеринбург, улица 8 марта, 212, оф. 335, Тел: 8-800-234-59-60",
      inn: "ИНН 6679113421; КПП 667901001",
      phone: "8-800-234-59-60",
    },
    gruzootpravitel: { name: "", address: "", inn: "", contact: "" },
    gruzopoluchatel: { name: "", address: "", contact: "" },
    gruz: { weight: "", description: "" },
    transport: {
      type: "",
      loadingType: "",
      unloadingType: "",
      docCountLoad: "",
      docCountUnload: "",
    },
    driver: { name: "", passport: "", vehicleInfo: "" },
    details: { dateTime: "", duration: "", notes: "", route: "", cost: "" },
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const Input = ({ section, field, placeholder }) => {
    const value = formData?.[section]?.[field] ?? "";

    return (
      <input
        type="text"
        placeholder={placeholder}
        className="input border p-2 rounded w-full"
        value={value}
        onChange={(e) => handleChange(section, field, e.target.value)}
      />
    );
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("/template.docx");
      const content = await response.arrayBuffer();

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData(formData);
      doc.render();

      const out = doc.getZip().generate({ type: "blob" });
      saveAs(out, "zayavka.docx");
    } catch (error) {
      console.error("Ошибка генерации DOCX:", error);
      alert("Произошла ошибка при генерации заявки.");
    }
  };

  return (
    <div id="zayavka-form">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-8 max-w-3xl mx-auto"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">
          Перевозчик
        </h2>
        <Input
          section="perevozchik"
          field="name"
          placeholder="Наименование перевозчика"
        />
        <Input
          section="perevozchik"
          field="address"
          placeholder="Адрес перевозчика"
        />
        <Input
          section="perevozchik"
          field="inn"
          placeholder="ИНН/КПП перевозчика"
        />
        <Input
          section="perevozchik"
          field="phone"
          placeholder="Телефон перевозчика"
        />

        <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">
          Грузоотправитель
        </h2>
        <Input
          section="gruzootpravitel"
          field="name"
          placeholder="Наименование грузоотправителя"
        />
        <Input
          section="gruzootpravitel"
          field="address"
          placeholder="Адрес грузоотправителя"
        />
        <Input
          section="gruzootpravitel"
          field="inn"
          placeholder="ИНН/КПП грузоотправителя"
        />
        <Input
          section="gruzootpravitel"
          field="contact"
          placeholder="Контактное лицо"
        />

        <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">
          Грузополучатель
        </h2>
        <Input
          section="gruzopoluchatel"
          field="name"
          placeholder="Наименование грузополучателя"
        />
        <Input
          section="gruzopoluchatel"
          field="address"
          placeholder="Адрес грузополучателя"
        />
        <Input
          section="gruzopoluchatel"
          field="contact"
          placeholder="Контактное лицо"
        />

        <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">
          Груз
        </h2>
        <Input section="gruz" field="weight" placeholder="Вес груза (кг)" />
        <Input
          section="gruz"
          field="description"
          placeholder="Описание груза"
        />

        <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">
          Транспорт
        </h2>
        <Input section="transport" field="type" placeholder="Тип транспорта" />
        <Input
          section="transport"
          field="loadingType"
          placeholder="Тип погрузки"
        />
        <Input
          section="transport"
          field="unloadingType"
          placeholder="Тип выгрузки"
        />
        <Input
          section="transport"
          field="docCountLoad"
          placeholder="Кол-во документов при погрузке"
        />
        <Input
          section="transport"
          field="docCountUnload"
          placeholder="Кол-во документов при выгрузке"
        />

        <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">
          Водитель
        </h2>
        <Input section="driver" field="name" placeholder="ФИО водителя" />
        <Input
          section="driver"
          field="passport"
          placeholder="Паспортные данные"
        />
        <Input
          section="driver"
          field="vehicleInfo"
          placeholder="Транспортное средство"
        />

        <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">
          Детали
        </h2>
        <Input
          section="details"
          field="dateTime"
          placeholder="Дата и время подачи"
        />
        <Input section="details" field="duration" placeholder="Время в пути" />
        <Input section="details" field="route" placeholder="Маршрут" />
        <Input section="details" field="cost" placeholder="Стоимость" />
        <Input
          section="details"
          field="notes"
          placeholder="Дополнительные условия"
        />

        <button
          type="button"
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Скачать в DOCX
        </button>
      </form>
    </div>
  );
};

export default CreateZayavkaForm;