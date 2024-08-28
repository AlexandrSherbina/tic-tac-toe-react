import React, { useEffect, useState } from "react";
import "./Popup.scss";

interface PopupProps {
  content: string;
  openPopup: boolean;
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
          <div className="popup-panel">
            <button className="popup-btn-close" onClick={handleClose}>
              x
            </button>
          </div>
          <div className="popup-content">{content}</div>
        </div>
      )}
    </>
  );
};

export default Popup;
