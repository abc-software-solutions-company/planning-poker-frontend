// import {NextApiRequest, NextApiResponse} from 'next';

// // Strapi webhook events
// type StrapiEvents = 'entry.create' | 'entry.update' | 'entry.delete' | 'entry.publish' | 'entry.unpublish';
// type StrapiModels = 'post' | 'section' | 'section_item';

// export default async function handleWebhook(req: NextApiRequest, res: NextApiResponse) {
//   const auth = req.headers.authorization;
//   const token = process.env.NEXT_PUBLIC_WEBHOOK_TOKEN;

//   if (!auth?.length) {
//     return res.status(403).send('Forbidden');
//   }

//   if (token === auth) {
//     const event = req.body.event as StrapiEvents;
//     const model = req.body.model as StrapiModels;

//     const shouldUpdatePostDetail = model === 'post' && event === 'entry.update';
//     const shouldUpdateBlogs = model === 'post' && event === 'entry.publish';
//     const shouldUpdateSection = model === 'section' && event === 'entry.update';
//     const shouldUpdateSectionItem = model === 'section_item' && event === 'entry.update';

//     const shouldUpdateHomepage = shouldUpdateSection || shouldUpdateBlogs || shouldUpdateSectionItem;

//     if (shouldUpdateHomepage) {
//       await (res as any).revalidate('/');
//     }

//     if (shouldUpdateBlogs || shouldUpdatePostDetail) {
//       await (res as any).revalidate('/blogs');
//     }

//     if (shouldUpdatePostDetail) {
//       await (res as any).revalidate(`/blogs/${req.body?.entry.slug}`);
//     }

//     return res.status(200).send('Success!');
//   }

//   return res.status(403).send('Forbidden');
// }
