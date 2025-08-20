import { RefObject } from "react";
import { Rectangle } from "recharts";

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240;

    // Calculate position relative to the viewport
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Check if dropdown is too close to the right edge of the viewport
    if (left + dropdownWidth > window.innerWidth) {
      // Adjust position to the left
      left = rect.right + window.scrollY - dropdownWidth;

      // Check if dropdown is still too close to the right edge of the viewport
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16;
      }
    }

    // Check if dropdown doesn't overflow the left edge of the viewport
    if (left < 0) {
      left = 16;
    }

    return { top, left };
  };

  return { getDropdownPosition };
};
