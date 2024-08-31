import { useEffect, useState } from "react";
import getImages from "../utils/getImages";
import "./BackgroundApp.scss";

interface BackgroundTypes {
  restart: boolean;
}
const BackgroundApp: React.FC<BackgroundTypes> = ({ restart }) => {
  const [images, setImages] = useState<string[]>([]);
  const [imageCounter, setImageCounter] = useState<number>(0);
  const importImages = [
    import("../assets/jpg/game-go/fon-game-go1.jpg"),
    import("../assets/jpg/game-go/fon-game-go2.jpg"),
    import("../assets/jpg/game-go/fon-game-go3.jpg"),
  ];

  useEffect(() => {
    getImages(importImages).then((images) => setImages(images));
  }, []);

  useEffect(() => {
    if (restart) {
      setImageCounter((prevScore) => (1 + prevScore) % images.length);
    }
  }, [restart, imageCounter]);

  return (
    <div
      className="container-background-app"
      style={{
        backgroundImage: `url(${images[imageCounter]})`,
      }}
    >
      <div className="glass"></div>
    </div>
  );
};

export default BackgroundApp;
