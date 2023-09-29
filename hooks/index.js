import { useState } from "react";

export function useDisclosure() {
  const [open, setOpen] = useState(null);

  const onClose = () => {
    setOpen(false)
  };

  const onOpen = () => {
    setOpen(true)
  };
  return { open, onClose, onOpen };
}
