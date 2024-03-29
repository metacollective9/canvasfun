import { type } from "os";
import { cx } from "../../utils/all";

type labelProps = {
  color: color;
  children: any;
};

type color = "green" | "blue" | "orange" | "purple" | "pink";

export default function Label(props: labelProps) {
  
  const color: any = {
    green: "text-green-500",
    blue: "text-blue-500",
    orange: "text-orange-400",
    purple: "text-purple-500",
    pink: "text-pink-500"
  };

  return (
    <span
      className={cx(
        "inline-block mt-5 text-xs font-medium tracking-wider uppercase ",
        color[props.color] || color["pink"]
      )}>
      {props.children}
    </span>
  );
}
