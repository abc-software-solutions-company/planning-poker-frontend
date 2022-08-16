import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {dehydrate, QueryClient} from 'react-query';

import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {SECTION_CONFIGS} from '@/configs/sections.config';
import {IPostsResponse, ISectionsResponse} from '@/types';

import http from '../http';

type PageProps = {
  slideshow: ISectionsResponse;
  introduction: ISectionsResponse;
  ourProcess: ISectionsResponse;
  pricing: ISectionsResponse;
  blogPosts: IPostsResponse;
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
  // Section Our process
  await queryClient.prefetchQuery([API_ENDPOINTS.SECTION, SECTION_CONFIGS.OUR_PROCESS, 'section-our-process'], () =>
    http.sections.all({
      locale,
      populate: {
        items: {
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
          $eq: SECTION_CONFIGS.OUR_PROCESS
        }
      }
    })
  );
  //Section pricing
  await queryClient.prefetchQuery([API_ENDPOINTS.SECTION, SECTION_CONFIGS.PRICING, 'section-pricing'], () =>
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
          $eq: SECTION_CONFIGS.PRICING
        }
      }
    })
  );
  //Section Introduction
  await queryClient.prefetchQuery([API_ENDPOINTS.SECTION, SECTION_CONFIGS.INTRODUCTION, 'section-introduction'], () =>
    http.sections.all({
      locale,
      populate: {
        body: '*'
      },
      filters: {
        slug: {
          $eq: SECTION_CONFIGS.INTRODUCTION
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

    const pricing = await http.sections.all({
      locale,
      populate: {
        items: {
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
          $eq: SECTION_CONFIGS.PRICING
        }
      }
    });

    const introduction = await http.sections.all({
      locale,
      populate: {
        body: '*'
      },
      filters: {
        slug: {
          $eq: SECTION_CONFIGS.INTRODUCTION
        }
      }
    });

    const ourProcess = await http.sections.all({
      locale,
      populate: {
        items: {
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
          $eq: SECTION_CONFIGS.OUR_PROCESS
        }
      }
    });

    const blogPosts = await http.posts.all({
      locale,
      sort: ['updatedAt:desc'],
      populate: {
        cover: '*',
        categories: {
          fields: ['name', 'id'],
          filters: {
            type: {$eq: 'blog'}
          }
        }
      },
      filters: {
        active: {$eq: true},
        categories: {
          type: {$eq: 'blog'}
        }
      },
      pagination: {
        start: 0,
        limit: 6
      }
    });

    return {
      props: {
        introduction,
        slideshow,
        ourProcess,
        pricing,
        blogPosts,
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
