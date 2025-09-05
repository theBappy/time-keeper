"use client";

import { Children, cloneElement, ReactElement } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

interface Props {
  className?: string;
  children: ReactElement<ButtonProps>[];
}

export function ButtonGroup({ className, children }: Props) {
  const totalButtons = Children.count(children);

  return (
    <div className={cn("flex w-full", className)}>
      {children.map((child, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === totalButtons - 1;

        return cloneElement(child, {
          key: child.key ?? index,
          className: cn(
            "flex-1",
            {
              "rounded-l-none": !isFirstItem,
              "rounded-r-none": !isLastItem,
              "border-l-0": !isFirstItem,
            },
            child.props.className
          ),
        });
      })}
    </div>
  );
}
