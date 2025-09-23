import { Image } from "antd";
import heatmap from "@/assets/heatmap.png"

const Map = () => {
  return (
    <Image src={heatmap} preview={false} style={{
      cursor: 'pointer'
    }} />
  );
};

export default Map