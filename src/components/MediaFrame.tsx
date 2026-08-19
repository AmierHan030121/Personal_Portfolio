import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";
import type { ProjectMedia } from "../content/projects";

interface MediaFrameProps {
  media: ProjectMedia;
  eager?: boolean;
  className?: string;
}

export function MediaFrame({ media, eager = false, className = "" }: MediaFrameProps) {
  const [failed, setFailed] = useState(false);
  const source = media.preview ?? media.src;

  useEffect(() => setFailed(false), [source]);

  if (failed) {
    return (
      <div className={`media-frame media-frame--fallback ${className}`} role="img" aria-label={`${media.alt}加载失败`}>
        <ImageOff aria-hidden="true" />
        <span>预览未加载</span>
        <a href={media.src} target="_blank" rel="noopener noreferrer">打开原始文件</a>
      </div>
    );
  }

  return (
    <div className={`media-frame ${className}`}>
      <img
        src={source}
        alt={media.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
