import { useState } from "react";

function useDisclosure() {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return { open, handleClose, handleOpen };
}

export default useDisclosure;
