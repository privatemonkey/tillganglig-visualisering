<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`content/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;
</script>


<svelte:head>
	<title>{post.metadata.title}</title>
</svelte:head>

<h1>{post.metadata.title}</h1>

<div class='content'>
	{@html post.html}
</div>


<style>
	.content {
    width: 46rem;
  }
</style>
