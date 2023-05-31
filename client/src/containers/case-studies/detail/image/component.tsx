import Image from 'next/image';

interface DetailImage {
  src: string;
  alt: string;
}

const CaseStudiesDetailImage = ({ src, alt }: DetailImage) => (
  <div className="relative -mx-28 mt-6 h-64">
    <Image className="mt-0 mb-0" alt={alt} src={src} fill priority style={{ objectFit: 'cover' }} />
  </div>
);

export default CaseStudiesDetailImage;
