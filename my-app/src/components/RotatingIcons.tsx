import React from "react";
import '../scss/styles/rotate.scss'

const RotatingIcons = () => {
  const icons = [
    { src: "https://th.bing.com/th/id/OIP.JsM4JQenSv5KTf-OStOCdgHaEK?rs=1&pid=ImgDetMain", alt: "Google Drive" },
    { src: "/images/dropbox.png", alt: "Dropbox" },
    { src: "/images/slack.png", alt: "Slack" },
    { src: "/images/zoom.png", alt: "Zoom" },
  ];

  return (
    <div className="rotating-icons-container">
      {/* Центральный объект */}
      <div className="center-logo">
        {/* <img src="/images/logo.png" alt="Central Logo" /> */}
        <h1>ProTasker</h1>
      </div>

      {/* Вращающиеся элементы */}
      <div className="rotating-circle">
        {icons.map((icon, index) => (
          <div key={index} className="icon">
            <img src={icon.src} alt={icon.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RotatingIcons;
