<script context="module">
	import { siteTitle } from '../stores/_config.js';
	export async function preload() {

		const res = await this.fetch(`undefined.json`);
		const article = await res.json();

		return { article, siteTitle };
	}
</script>

<script>
	export let article;
	export let siteTitle;
</script>

<svelte:head>
	<title>{siteTitle}</title>
</svelte:head>

<div class="content">
  <aside>

  </aside>
  <article>
	{@html article.html}
  </article>
</div>

<style>
.content {
    display: grid;
    grid-template-columns: 54rem 24rem;
    grid-template-rows: auto;
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
