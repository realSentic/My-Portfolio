"use client";

import { useEffect, useState } from "react";
import HalftoneReveal from "../../../components/ui/HalftoneReveal";

function useIsMobile(query = "(max-width: 1023px)") {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return match;
}

export default function Halftone() {
  const mobile = useIsMobile();

  return (
    <div className="h-full w-full">
      <div className="h-full w-full rounded-full border border-white/15 bg-white/5 p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm lg:rounded-[28px] lg:p-3 lg:shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="h-full w-full touch-pan-y overflow-hidden rounded-full lg:rounded-[22px]">
          <HalftoneReveal
            src="/me.png"
            mode="duotone"
            shape="dot"
            cellSize={mobile ? 5 : 7}
            angle={22}
            inkColor="#8b9cff"
            accentColor="#267825"
            paperColor="#120f17"
            revealRadius={mobile ? 110 : 160}
            dotScale={1}
            contrast={1.05}
            brightness={0}
            invert={false}
            roughness={0.35}
            misregistration={0.4}
            fit="cover"
            softness={0.6}
            linger={1}
            reverse={false}
            wander={mobile}
            clickBurst
            intro
          />
        </div>
      </div>
    </div>
  );
}