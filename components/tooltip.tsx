 export default function ToolTip() {
  return (
    <div id="tooltip-default" role="tooltip" className="dark:bg-white">
        Tooltip content
        <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  );
}