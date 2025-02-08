import WidgetItem from "./widget-item";

const WidgetPage = ({ widget }) => {

    return (
        widget && (
            <WidgetItem widget={widget} />
        )
    );
};

export default WidgetPage;
