import { getSlides } from './_slides.js';

const contents = JSON.stringify(getSlides()
  .filter(it => it.metadata.published == 'true')
  .map(slide => {
  return {
    title: slide.metadata.title,
    date: slide.metadata.dateString,
    description: slide.metadata.description,
    slug: slide.slug
  };
}));

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(contents);
}
