import { Slider } from "./components/pages/home/slider/Slider";
import {
  SliderData,
  MiniSliderData,
} from "./components/pages/home/slider/slider.data";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <Slider className="max-h-10" data={MiniSliderData} />
      <Slider data={SliderData} />
    </div>
  );
}
