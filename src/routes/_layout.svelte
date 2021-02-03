<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<svelte:head>
<link rel="stylesheet" href="tufte.css"/>
</svelte:head>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

<style>

</style>
