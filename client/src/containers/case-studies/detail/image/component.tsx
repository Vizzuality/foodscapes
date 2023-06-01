import Image from 'next/image';

interface DetailImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const CaseStudiesDetailImage = ({ src, alt, width, height }: DetailImage) => (
  <div className="relative -mx-20 mt-6">
    <Image
      className="mt-0 mb-0"
      alt={alt}
      src={src}
      width={width}
      height={height}
      priority
      style={{ objectFit: 'cover' }}
    />
  </div>
);

export default CaseStudiesDetailImage;
