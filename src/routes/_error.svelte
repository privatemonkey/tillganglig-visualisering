<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	h1, p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<article>

 {#if status==400}
 <h1>Hittade inte sidan</h1>
<p>Hittade ingen sida på adressen du angav</p>
{/if}
 {#if status==500}
  <h1>Fel i hämtning</h1>
  <p>Det inträffade ett fel då vi skulle hämta data</p>
{/if}
</article>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
