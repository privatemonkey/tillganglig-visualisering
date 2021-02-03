<script context="module">
  import marked from 'marked';
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
    const res = await this.fetch(`slides/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
      data.pages.forEach(element => {
        element['html'] = marked(element.md)
      });
			return { slide: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
  export let slide;
  let current = slide.pages[0].id
</script>

<svelte:head>
	<title>{slide.metadata.title}</title>
</svelte:head>

<article>
{#each slide.pages as page, i}
  <section id="{page.id}" class:active={current==page.id}>
  {@html page.html}
  </section>
{/each}
</article>

<nav>
{#each slide.pages as page, i}
  <button on:click={()=>current=page.id}>
  {page.title}
  </button>
{/each}
</nav>


<style>
  button.active {
    background-color: blue;
  }
	.content {
    width: 100vw;
    font-size: 200%;
  }

  section {
    padding: 3rem;
    display: none;
  }
  section.active {display: block;}
</style>
