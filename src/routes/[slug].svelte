<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { page: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
  import Index from '../components/Index.svelte'

  export let page;
  let y;
</script>

<svelte:window bind:scrollY={y}/>

<svelte:head>
	<title>{page.metadata.title}</title>
</svelte:head>

<div class="content">
  <aside id="index" class="sticky">
    <Index content={page.content} slug={page.slug} />
  </aside>

  <article>
    {@html page.html}
  </article>
</div>

<style>
  .sticky {
    position: -webkit-sticky;
    position: sticky;
  }

  .content {
    display: grid;
    grid-template-columns: 42rem 24rem;
    grid-template-rows: auto;
    grid-gap: 2rem;
    grid-template-areas:
    "article aside";
  }

  article {
    grid-area: article;
  }
  aside {
    grid-area: aside;
    padding: 7rem 0 4rem;
  }
</style>
