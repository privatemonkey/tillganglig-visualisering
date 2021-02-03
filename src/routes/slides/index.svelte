<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`slides.json`).then(r => r.json()).then(slides => {
			return { slides };
		});
	}
</script>

<script>
	export let slides;
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Presentationer - Tillgänglig statistikvisualisering</title>
</svelte:head>

<article>
<h1>Presentationer</h1>

<ul>
	{#each slides as slide}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel='prefetch' href='slides/{slide.slug}'>{slide.title}</a></li>
	{/each}
</ul>
</article>
