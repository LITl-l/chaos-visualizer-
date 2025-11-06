import { JSX, splitProps } from "solid-js";
import { cn } from "~/lib/utils";

export interface CheckboxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox(props: CheckboxProps) {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <input
      type="checkbox"
      class={cn(
        "w-5 h-5 rounded cursor-pointer",
        "accent-fuchsia-500",
        "focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-background",
        local.class
      )}
      {...others}
    />
  );
}
