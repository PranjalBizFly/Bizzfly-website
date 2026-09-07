import Image from "next/image";
import styles from "./Sections.module.css";

interface MediaBlockProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** True only for an above-the-fold LCP image. */
  priority?: boolean;
}

/**
 * S-20 Editorial Image. Explicit dimensions always — the primary CLS defence.
 * Only used when the image adds information (design principle P5).
 */
export function MediaBlock({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
}: MediaBlockProps) {
  return (
    <figure>
      <div className={styles.mediaBlock}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      {caption ? (
        <figcaption className={styles.mediaCaption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
