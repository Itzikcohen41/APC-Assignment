const WidgetItem = ({ widget }) => {
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
    </div>
  );
};

export default WidgetItem;
