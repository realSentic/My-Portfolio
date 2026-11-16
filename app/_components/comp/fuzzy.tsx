import FuzzyText from "../../../components/ui/FuzzyText";

export default function Fuzzy () {
    return (
        <div className="-ml-6" style={{ fontFamily: "var(--font-kumbh)" }}>
            <FuzzyText
            color="#3dff7a"
            texts={['Web Developer', 'Game Developer', 'Fullstack Developer', 'Computer Science Student']}
            fontSize={45}
            fontFamily="inherit"
            cycleInterval={5000}
            intro
            introDuration={1400}
            colorSplit={0}
            trigger="hover"
            direction="horizontal"
            baseIntensity={0.2}
            hoverIntensity={0.5}
            fuzzRange={7}
            sliceSize={1}
            fps={60}
            transitionDuration={0}
            letterSpacing={0}
            enableHover
            clickEffect={false}
            glitchMode={false}
            />
        </div>
    )
};
