<script>
  import marked from 'marked';
  import { beforeUpdate } from 'svelte'

  export let content
  export let slug

  function toIndex(content) {
    var arrHeadings = [];

    if (content!='') {
      var slugger = new marked.Slugger()

      // Add all headings to an array
      const walkTokens = (token) => {
        if (token.type === 'heading') {
          var heading = {
            level: token.depth,
            text: token.text,
            id: slugger.slug(token.text)
          }
          arrHeadings.push(heading)
        }
      };

      marked.use({ walkTokens });
      marked(content)
      return arrHeadings
    } else {
      return []
    }
  }

  beforeUpdate(() => {
    index =toIndex(content)
  })

  let index = []
</script>

<h2>Sidans innehåll</h2>
<nav>
{#each index as header, i}
<span class="h{header.level}"><a href="{slug}#{header.id}">{header.text}</a></span>
{/each}
</nav>

<style>
span {
  clear:left;
  float:left;
}

span.h1 {
  display: none;
}

span.h2 a:link {
  font-size: 1.6rem;
}

span.h3 a:link {
  font-size: 1.3rem;
}

a:link {
  margin-bottom: 0.75rem;
}

span::before {
  content: '▪ ';
}
</style>
