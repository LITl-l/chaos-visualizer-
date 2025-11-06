import { JSX, splitProps } from "solid-js";
import { cn } from "~/lib/utils";

export interface SliderProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  value?: number;
  onValueChange?: (value: number) => void;
}

export function Slider(props: SliderProps) {
  const [local, others] = splitProps(props, ["class", "value", "onValueChange"]);

  return (
    <input
      type="range"
      class={cn(
        "w-full h-2 rounded-lg appearance-none cursor-pointer",
        "bg-secondary",
        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-cyan-400 [&::-webkit-slider-thumb]:to-fuchsia-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
        "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-br [&::-moz-range-thumb]:from-cyan-400 [&::-moz-range-thumb]:to-fuchsia-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110",
        local.class
      )}
      value={local.value}
      onInput={(e) => {
        local.onValueChange?.(parseFloat(e.currentTarget.value));
      }}
      {...others}
    />
  );
}
