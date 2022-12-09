import { IconButton } from "@community-next/design-system";
import React, { useCallback, useEffect } from "react";
import { BsList } from "react-icons/bs";

export const MenuList = () => {
  const handleHideSidebar = useCallback((e: MouseEvent) => {
    if (e.target instanceof HTMLElement && !e.target.closest(".sidebar")) {
      document.body.classList.remove("show-sidebar");
      document.body.removeEventListener("click", handleHideSidebar);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (document.body.classList.contains("show-sidebar")) {
      document.body.classList.remove("show-sidebar");
      document.body.removeEventListener("click", handleHideSidebar);
    } else {
      document.body.classList.add("show-sidebar");
      document.body.addEventListener("click", handleHideSidebar);
    }
  }, [handleHideSidebar]);

  return (
    <IconButton
      Icon={BsList}
      variant="ghost"
      size="lg"
      onClick={handleClick}
      className="md:hidden"
    />
  );
};
