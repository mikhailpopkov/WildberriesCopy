import { Slider } from "@/shared";
import { SliderData, MiniSliderData } from "@/shared";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <Slider className="max-h-10" data={MiniSliderData} />
      <Slider data={SliderData} />
    </div>
  );
}
