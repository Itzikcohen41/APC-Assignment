import React, { useState, useEffect } from "react";
import { getAllWidgets } from "../src/api/widget-api";
import WidgetPage from "./components/widget-page";
import { normalizeWidgets } from "./utils/normalize";
import { NavButton } from "./components/nav-button";
const App = () => {
  const [allWidgets, setAllWidgets] = useState({});
  const [pagesName, setPagesName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [widgetsPerPage, setWidgetsPerPage] = useState([]);

  useEffect(() => {
    const fetchAllWidgets = async () => {
      try {
        const response = await getAllWidgets();
        setAllWidgets(response);
        setPagesName(Object.keys(response)); // Extract keys from response object
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllWidgets();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-screen flex bg-slate-50">
      <nav className="w-1/3 border-r border-0.5 border-slate-300 p-12">
        <ol className="w-full flex flex-col items-center gap-4">
          {pagesName.map((pageName) => (
            <li>
              <NavButton
                label={pageName}
                onClick={() =>
                  setWidgetsPerPage(normalizeWidgets(allWidgets[pageName]))
                }
              />
            </li>
          ))}
        </ol>
      </nav>
      <main className="p-12">
        <WidgetPage widgets={widgetsPerPage} />
      </main>
    </div>
  );
};

export default App;
