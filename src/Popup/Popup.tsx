import React, { useEffect, useState } from "react";
import "./Popup.scss";

interface PopupProps {
  content: string;
  openPopup: boolean;
  setOpenPopup?: () => void;
}

const Popup: React.FC<PopupProps> = ({ openPopup, content }) => {
  const [open, setOpen] = useState<boolean>(openPopup);

  const handleClose = () => setOpen(!open);

  useEffect(() => {
    setOpen(openPopup);
  }, [openPopup]);
  return (
    <>
      {open && (
        <div className="popup">
          <button className="popup-btn-close" onClick={handleClose}>
            X
          </button>
          {content}
        </div>
      )}
    </>
  );
};

export default Popup;
