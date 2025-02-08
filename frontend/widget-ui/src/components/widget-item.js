import { useState } from "react";
import {
  updateWidgetByID,
  deleteWidgetByID,
  addWidget,
} from "../api/widget-api";
import { Modes } from "../utils/mode";

const WidgetButton = ({ children, className = "", onClick }) => {
  return (
    <button
      className={`${className} rounded-md border-2 border-slate-300 px-2 py-0.5 hover:bg-gray-200 text-sm uppercase font-bold`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const WidgetItem = ({
  widget,
  setRefresh,
  page_name,
  setAddMode,
  validateWidgets,
}) => {
  const [formMode, setFormMode] = useState(widget ? Modes.VIEW : Modes.ADD);
  const [widgetDetails, setWidgetDetails] = useState({ ...widget });

  const handleOnChange = (ev, key) => {
    setWidgetDetails((prev) => ({
      ...prev,
      [key]: ev.target.value,
    }));
  };

  const handleOnSave = async () => {
    if (validateWidgets(widgetDetails)) {
      if (formMode === Modes.EDIT) {
        await updateWidgetByID({
          page_name: widgetDetails.page_name,
          widget_id: widgetDetails.id,
          widget: widgetDetails,
        });
        setFormMode(Modes.VIEW);
      } else if (formMode === Modes.ADD) {
        await addWidget({ ...widgetDetails, page_name });
        setAddMode(false);
      } else {
        alert("unsupported widget edit mode");
      }
    } else {
      alert("can't save Widget");
      handleOnCancel();
    }
    setRefresh(true);
  };
  const handleOnCancel = async () => {
    if (formMode === Modes.EDIT) {
      setFormMode(Modes.VIEW);
      setWidgetDetails(widget);
    } else {
      //after ADD mode i need to render the speafic page
      setAddMode(false);
    }
  };

  if (formMode === Modes.EDIT || formMode === Modes.ADD) {
    return (
      <div className="relative p-4 w-64 h-96 flex flex-col rounded-md bg-white shadow-xl">
        <div className="absolute right-4 bottom-4 rounded-full bg-gray-300 size-12 text-xs flex items-center justify-center">
          <input
            type="text"
            className="w-8 text-center"
            defaultValue={widgetDetails.showToPercentage}
            onChange={(ev) => handleOnChange(ev, "showToPercentage")}
          />
        </div>
        {/* Widget content */}
        <div className="flex-1">
          <img
            src={widgetDetails.thumbnail}
            className="mb-4 h-32 w-full object-cover rounded-lg"
            alt="Thumbnail"
          />
          <p className="text-xs text-green-700 font-semibold border-1">
            <input
              type="text"
              defaultValue={widgetDetails.price}
              placeholder="Price"
              onChange={(ev) => handleOnChange(ev, "price")}
            />
          </p>
          <h3 className="font-bold text-lg border-1">
            <input
              type="text"
              defaultValue={widgetDetails.header}
              placeholder="Header"
              onChange={(ev) => handleOnChange(ev, "header")}
            />
          </h3>
          <p className="text-sm text-slate-500 border-1">
            <input
              type="text"
              defaultValue={widgetDetails.text}
              placeholder="Text"
              onChange={(ev) => handleOnChange(ev, "text")}
            />
          </p>
        </div>
        {/* Widget buttons */}
        <div className="flex flex-row gap-2 mt-4 h-8">
          <WidgetButton onClick={handleOnSave}>Save</WidgetButton>
          <WidgetButton onClick={handleOnCancel}>Cancel</WidgetButton>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-4 w-64 h-96 flex flex-col  rounded-md bg-white shadow-xl">
      <div className="absolute right-4 bottom-4 rounded-full bg-gray-300 size-12 text-xs flex items-center justify-center">
        {widget.showToPercentage}%
      </div>
      {/* Widget content */}
      <div className="flex-1">
        <img
          src={widget.thumbnail}
          className="mb-4 h-32 w-full object-cover rounded-lg"
          alt="Thumbnail"
        />
        <p className="text-xs text-green-700 font-semibold">{widget.price}</p>
        <h3 className="font-bold text-lg">{widget.header}</h3>
        <p className="text-sm text-slate-500">{widget.text}</p>
      </div>
      {/* Widget buttons */}
      <div className="flex flex-row gap-2 mt-4 h-8">
        <WidgetButton onClick={() => setFormMode(Modes.EDIT)}>
          Edit
        </WidgetButton>
        <WidgetButton
          onClick={async () => {
            await deleteWidgetByID({
              page_name: widgetDetails.page_name,
              widget_id: widgetDetails.id,
            });
            setRefresh(true);
          }}
        >
          Delete
        </WidgetButton>
      </div>
    </div>
  );
};

export default WidgetItem;
