import WidgetItem from "./widget-item";
import { getWidgetsByPage } from "../api/widget-api";
import { useState, useEffect } from "react";
import { normalizeWidgets } from "../utils/normalize";
import { shouldDisplayWidget, validationPerPage } from "../utils/validation";

const WidgetPage = ({ widgets }) => {
  const [refresh, setRefresh] = useState(false);
  const [widgetsPage, setWidgetsPage] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(null); // Track the current page

  useEffect(() => {
    if (widgets && widgets.length > 0) {
      const pageName = widgets[0].page_name; // Get page name of the first widget
      setCurrentPage(pageName);

      // Reset addMode when the page changes
      setAddMode(false);

      if (validationPerPage(widgets)) {
        setWidgetsPage(widgets.filter(shouldDisplayWidget));
      }
    }
  }, [widgets]);

  useEffect(() => {
    const fetchWidgetsByPage = async () => {
      if (!widgets || widgets.length === 0) return;

      try {
        if (refresh && currentPage) {
          const response = await getWidgetsByPage(currentPage);
          const widgetsArray = normalizeWidgets(response);
          if (validationPerPage(widgetsArray)) {
            setWidgetsPage(widgetsArray.filter(shouldDisplayWidget));
          }
          setRefresh(false);
        }
      } catch (error) {
        console.error("Error fetching widgets:", error);
      }
    };

    fetchWidgetsByPage();
  }, [refresh, currentPage, widgets]);

  const validateWidgets = (widget) => {
    const filterWidgets = widgets.filter((w) => w.id !== widget.id);
    return validationPerPage([...filterWidgets, widget]);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-12">
        {/* Show the Add button only for the current page */}
        {currentPage && !addMode && (
          <button
            className="rounded-md border-2 border-slate-300 px-2 py-0.5 hover:bg-gray-200 text-sm uppercase font-bold"
            onClick={() => setAddMode(true)}
          >
            Add
          </button>
        )}
      </div>
      <div>
        <ul className="flex flex-col md:flex-row flex-wrap gap-6">
          {widgetsPage.length > 0 &&
            widgetsPage.map((widget) => (
              <WidgetItem
                className=""
                key={widget.id}
                widget={widget}
                setRefresh={setRefresh}
                validateWidgets={validateWidgets}
              />
            ))}
          {addMode && (
            <WidgetItem
              key="add-widget"
              widget={null}
              page_name={currentPage}
              setRefresh={setRefresh}
              setAddMode={() => setAddMode(false)}
              validateWidgets={validateWidgets}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default WidgetPage;
