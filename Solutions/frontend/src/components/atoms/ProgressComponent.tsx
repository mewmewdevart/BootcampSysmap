import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { twMerge } from "tailwind-merge"

interface ProgressComponentProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  starter: number
  current: number
}

function ProgressComponent({
  className,
  starter,
  current,
  ...props
}: ProgressComponentProps) {
  const progress = Math.max(0, Math.min(100, current - starter))

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={twMerge(
        "relative h-[4px] w-full overflow-hidden rounded-full bg-[#D7D7D7]",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all"
        style={{
          transform: `translateX(-${100 - progress}%)`,
          background: "linear-gradient(90deg, #009966 -0.05%, #00BC7D 100.01%)"
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { ProgressComponent }
