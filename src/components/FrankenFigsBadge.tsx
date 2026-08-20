import frankenFigsCover from "../../assets/frankenfigs-cover.jpg";

export function FrankenFigsBadge() {
  return (
    <a
      className="frankenfigs-badge"
      href="https://www.figma.com/community/file/1540896037061781845/frankenfigs"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="打开 FrankenFigs Figma 素材"
    >
      <img src={frankenFigsCover} alt="FrankenFigs 粉色圆眼形象" />
    </a>
  );
}
