import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {dehydrate, QueryClient} from 'react-query';

import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {SECTION_CONFIGS} from '@/configs/sections.config';
import {ISectionsResponse} from '@/types';

import http from '../http';

type PageProps = {
  slideshow: ISectionsResponse;
};

export const getStaticProps: GetStaticProps<PageProps> = async ({locale}) => {
  const queryClient = new QueryClient();

  // Section Slideshow
  await queryClient.prefetchQuery([API_ENDPOINTS.SECTION, SECTION_CONFIGS.SLIDESHOW, 'section-slideshow'], () =>
    http.sections.all({
      locale,
      populate: {
        items: {
          populate: ['image'],
          sort: ['order'],
          filters: {
            active: {
              $eq: true
            }
          }
        }
      },
      filters: {
        slug: {
          $eq: SECTION_CONFIGS.SLIDESHOW
        }
      }
    })
  );

  try {
    const slideshow = await http.sections.all({
      locale,
      populate: {
        items: {
          populate: ['image'],
          sort: ['order'],
          filters: {
            active: {
              $eq: true
            }
          }
        }
      },
      filters: {
        slug: {
          $eq: SECTION_CONFIGS.SLIDESHOW
        }
      }
    });

    return {
      props: {
        slideshow,
        ...(await serverSideTranslations(locale!, ['common'])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient)))
      },
      revalidate: 10
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};
