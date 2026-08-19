import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProjectMedia } from "../content/projects";

interface MediaDialogProps {
  media: ProjectMedia | null;
  title: string;
  onClose: () => void;
}

export function MediaDialog({ media, title, onClose }: MediaDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [failedSources, setFailedSources] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (!media) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [media, onClose]);

  useEffect(() => setFailedSources(new Set()), [media]);

  if (!media) return null;

  const markFailed = (src: string) => {
    setFailedSources((current) => new Set(current).add(src));
  };

  const imageOrFallback = (src: string, alt: string) => (
    failedSources.has(src) ? (
      <div className="dialog-media__fallback">
        <p>这张预览未能加载。</p>
        <a href={src} target="_blank" rel="noopener noreferrer">在新窗口打开</a>
      </div>
    ) : (
      <img src={src} alt={alt} decoding="async" onError={() => markFailed(src)} />
    )
  );

  return (
    <div className="media-overlay" role="dialog" aria-modal="true" aria-labelledby="media-dialog-title" onMouseDown={(event) => {
      if (event.currentTarget === event.target) onClose();
    }}>
      <section className="media-dialog">
        <header>
          <div>
            <span className="utility-label">Media preview</span>
            <h2 id="media-dialog-title">{title}</h2>
          </div>
          <button ref={closeRef} className="icon-button" type="button" onClick={onClose} aria-label="关闭预览">
            <X aria-hidden="true" />
          </button>
        </header>
        <div className={`dialog-media dialog-media--${media.kind}`}>
          {media.kind === "gallery"
            ? media.gallery?.map((item) => <figure key={item.src}>{imageOrFallback(item.src, item.alt)}</figure>)
            : media.kind === "pdf"
              ? <iframe src={media.src} title={`${title} PDF 预览`} />
              : imageOrFallback(media.src, media.alt)}
        </div>
        <footer>
          <span>{media.label}</span>
          <a href={media.src} target="_blank" rel="noopener noreferrer">
            打开原始文件 <ExternalLink aria-hidden="true" />
          </a>
        </footer>
      </section>
    </div>
  );
}
