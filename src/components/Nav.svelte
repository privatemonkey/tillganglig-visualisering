<script>
  import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  export let segment;
  let y;
</script>

<svelte:window bind:scrollY={y}/>

{#if y<40}
<nav transition:fly="{{delay: 0, duration: 300, x: 0, y: -100, opacity: 0.5, easing: quintOut}}">
  <a rel=prefetch aria-current="{segment === undefined ? 'page' : undefined}" href=".">Start</a>
  <a rel=prefetch aria-current="{segment === 'lathund' ? 'page' : undefined}" href="lathund">Lathunden</a>
  <a rel=prefetch aria-current="{segment === 'more' ? 'page' : undefined}" href="more">Annat stöd</a>
  <a rel=prefetch aria-current="{segment === 'about' ? 'page' : undefined}" href="about">Om webbplatsen</a>
</nav>
{/if}

<style>
	nav {
		font-weight: 300;
    padding: 0 1em;
    position: fixed;
	}
  a {
    float: left;
    margin-right: 1rem;
    margin-top: 0;
    font-size: 1.6rem;
  }

	a:link {
    text-decoration: none;
		padding: 0.75em 0.5em 1rem;
    display: block;
    color: #333;
  }

  a[aria-current="page"] {
    color: #000;
    font-weight: bold;
    border-bottom: 3px solid #000;
  }
</style>
