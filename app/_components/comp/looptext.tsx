'use client';

import TextLoop from '../../../components/ui/TextLoop';

export default function LoopText () {
    return (
        <div>
            <TextLoop
                text="React ✦ Bits"
                shape="wave"
                speed={90}
                direction="forward"
                separator="✦"
                curviness={0}
                tilt={0}
                fontSize={15}
                fontWeight={800}
                letterSpacing={2}
                uppercase
                ribbon
                ribbonColor="#5227FF"
                ribbonWidth={50}
                edgeFade={0}
                cross={false}
                crossAngle={16}
                draggable={false}
                scrollBoost={0}
                outline={false}
                outlineWidth={1.5}
                pauseOnHover={false}
                />
        </div>
    )
}
