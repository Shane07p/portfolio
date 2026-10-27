import './ImageSlot.css';

type Props = { src?: string; alt: string; placeholder: string };

// Fills its container with an image, or a labelled placeholder until one is set in content.ts.
export function ImageSlot({ src, alt, placeholder }: Props) {
  if (src) return <img className="slot__img" src={src} alt={alt} loading="lazy" draggable={false} />;
  return (
    <div className="slot slot--empty" role="img" aria-label={alt}>
      <span>{placeholder}</span>
    </div>
  );
}
