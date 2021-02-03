import fs from 'fs';
import path from 'path';
import marked from 'marked';
import { siteUrl } from '../../stores/_config.js';

const SLIDES_DIR = 'content/slides';

export function getSlides () {
  const slugs = fs.readdirSync(SLIDES_DIR)
    .filter(file => path.extname(file) === '.md')
    .map(file => file.slice(0, -3));

  return slugs.map(getSlide);
}

const renderHeadingWithAnchor = (slug) => (text, level) => {
  // var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  var slugger = new marked.Slugger()
  var escapedText = slugger.slug(text)
  return `
    <h${level} id="${escapedText}">
      <a name="${escapedText}" aria-hidden="true" class="anchor" href="${slug}#${escapedText}">
        <span class="header-link"></span>
      </a>
      ${text}
    </h${level}>`;
};


export function getSlide(slug) {

  const file = `${SLIDES_DIR}/${slug}.md`;
  if (!fs.existsSync(file)) return null;

  const markdown = fs.readFileSync(file, 'utf-8');

  const { content, metadata } = processMarkdown(markdown);

  const renderer = new marked.Renderer();
  renderer.heading = renderHeadingWithAnchor(slug);

  const thumb = metadata.thumb;
  metadata.thumb = (thumb && thumb.indexOf(siteUrl) < 0) ? (siteUrl + '/' + thumb) : thumb;

  const html = marked(content, {
    smartypants: true,
    renderer: renderer,
  });

  const alternateSlug = metadata.slug;

  let pages = toPages(content)

  return {
    slug: alternateSlug || slug,
    metadata,
    html,
    content,
    pages
  };
}

function toPages(content) {
  // Run after any other use of marked

  let slugger = new marked.Slugger()
  let arrPages = []
  let header = ''
  let page = []
  let splitLevel = 2

  let pages = []
  let md = ''

  const walkTokens = (token) => {
    if (token.type === 'heading' && token.depth === splitLevel && pages.includes(header)==false && arrPages.includes(page)==false) {
      // Push last page
      if (header!='') {
        // console.log(header)
        let obj = {
          id: slugger.slug(header),
          title: header,
          page: page,
          md: md
        }
        // arrPages.push(page)
        arrPages.push(obj)
        md = ''
      }

      // Create new page
      page = []
      header = token.text
      pages.push(slugger.slug(header))

      let obj = Object.assign({}, token);
      delete obj.tokens
      obj['page'] = slugger.slug(header)
      md += token.raw
      page.push(obj)
    }
    if (token.type === 'heading' && token.depth > splitLevel) {
      let obj = Object.assign({}, token);
      delete obj.tokens
      obj['page'] = header
      md += token.raw
      page.push(obj)
    }

    if (token.type != 'heading' && token.type != 'text' && token.text!=undefined) {
      let obj = Object.assign({}, token);
      delete obj.tokens
      obj['page'] = header
      md += token.raw
      page.push(obj)
    }
  };

  marked.use({ walkTokens })
  marked(content)

  let obj = {
    id: slugger.slug(header),
    title: header,
    page: page,
    md: md
  }

  arrPages.push(obj)
  // arrPages.push(page)

  return arrPages;
}

function processMarkdown(markdown) {
  const match = /---\n([\s\S]+?)\n---/.exec(markdown);
  const frontMatter = match[1];
  const content = markdown.slice(match[0].length);

  const metadata = {};
  frontMatter.split('\n').forEach(pair => {
    const colonIndex = pair.indexOf(':');
    metadata[pair.slice(0, colonIndex).trim()] = pair
      .slice(colonIndex + 1)
      .trim();
  });

  return { metadata, content };
}
