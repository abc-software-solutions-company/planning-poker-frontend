import {NextSeo, NextSeoProps} from 'next-seo';
import {OpenGraphMedia} from 'next-seo/lib/types';

interface SeoProps extends NextSeoProps {
  url?: string;
  cover?: any;
}

const Seo: React.FC<SeoProps> = ({title, description, cover, url, ...rest}: SeoProps) => {
  const image = cover;
  let images: ReadonlyArray<OpenGraphMedia> = [{url: '/og-img.jpg', width: 1200, height: 630, alt: 'Planning Poker'}];
  if (image) images = [{url: image.url, width: image.width, height: image.height, alt: cover.alternativeText}];
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        images,
        url: url ? `${process.env.NEXT_PUBLIC_SITE_URL}${url}` : process.env.NEXT_PUBLIC_SITE_URL
      }}
      {...rest}
    />
  );
};

export default Seo;
