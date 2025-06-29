// "use client";

// import * as React from "react";
// import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
// import { CircleIcon } from "lucide-react";

// import { cn } from "@/lib/utils";

// function RadioGroup({ className, ...props }) {
//   return (
//     <RadioGroupPrimitive.Root
//       data-slot="radio-group"
//       className={cn("grid gap-3", className)}
//       {...props}
//     />
//   );
// }

// function RadioGroupItem({ className, ...props }) {
//   return (
//     <RadioGroupPrimitive.Item
//       data-slot="radio-group-item"
//       className={cn(
//         "aspect-square size-4 shrink-0 rounded-full border border-input shadow-xs text-primary transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:bg-input/30 disabled:cursor-not-allowed disabled:opacity-50",
//         className,
//       )}
//       {...props}
//     >
//       <RadioGroupPrimitive.Indicator
//         data-slot="radio-group-indicator"
//         className="relative flex items-center justify-center"
//       >
//         <CircleIcon className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" />
//       </RadioGroupPrimitive.Indicator>
//     </RadioGroupPrimitive.Item>
//   );
// }

// export { RadioGroup, RadioGroupItem };

"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function RadioGroup({ className, ...props }) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-4 shrink-0 rounded-full border border-input shadow-xs text-primary transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:bg-input/30 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
