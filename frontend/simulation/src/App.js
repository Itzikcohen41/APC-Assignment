import "./App.css";
import { useState } from "react";
import { getWidgetByPage } from "./api/widget-api";
import WidgetPage from "./components/widget-page";
import { NavButton } from "./components/nav-button";
function App() {
  const [widgetPerPage, setWidgetPerPage] = useState(null);
  const handleOnClick = async (page_name) => {
    const widget = await getWidgetByPage(page_name);
    setWidgetPerPage(widget);
  };
  return (
    <div className="w-full h-screen flex bg-slate-50">
      <nav className="w-1/3 border-r border-0.5 border-slate-300 p-12">
        <ol className="w-full flex flex-col items-center gap-4">
          <li>
            <NavButton label="Home" onClick={() => handleOnClick("homepage")} />
          </li>
          <li>
            <NavButton label="Cards" onClick={() => handleOnClick("cards")} />
          </li>
          <li>
            <NavButton
              label="Wedding"
              onClick={() => handleOnClick("wedding")}
            />
          </li>
        </ol>
      </nav>
      <main className="p-12">
        <WidgetPage widget={widgetPerPage} />
      </main>
    </div>
  );
}

export default App;
