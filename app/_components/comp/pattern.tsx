import LetterGlitch from "../../../components/ui/LetterGlitch";

export default function Pattern() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <LetterGlitch
        glitchColors={["#ffffff", "#61dca3"]}
        glitchAmount={0.5}
        speed={1}
        flow={0.5}
        clickEffect="tear"
        baseColor="#ffffff"
        fontSize={14}
        spacing={0.6}
        density={0.9}
        baseOpacity={0.16}
        smooth
        edgeFade={0}
        centerFade={0}
        interactive
        cursorRadius={140}
        intro
        lightMode={false}
      />
    </div>
  );
}