<script>
  import { onMount } from 'svelte';
  import Icon from './Icons.svelte';

  let randomFact = '';
  let isLoading = false;
  let fetchFail = false;

  onMount(async () => {
    isLoading = true;

    Promise.allSettled([fetch('http://localhost:1337/random-facts')])
      .then(async ([resPosts]) => {
        const resPostsResponse = resPosts.value;
        return [await resPostsResponse.json()];
      })
      .then((res) => {
        randomFact = res[0];
      })
      .catch((err) => {
        console.error(err);
        fetchFail = true;
        isLoading = false;
      })
      .finally(() => {
        isLoading = false;
      });
  });
</script>

<div class="mb-8 pt-2 rounded-lg h-screen" id="about-section">
  <Icon type="terminal" gradientFrom="76, 252, 255" gradientTo="76, 160, 255" />
  <h3 class="font-bold text-2xl mb-2 md:text-4xl">
    Who
    <span
      style="background:linear-gradient(122.25deg, #4CFCFF 12.16%, #4C97FF 70.98%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;"
    >
      am I.
    </span>
  </h3>
  <p class="mb-4">
    I'm a systems analyst based in Bolívar a beautiful small city in Buenos Aires - Argentina. I
    specialise in help teams and clients to build products from the ground up. In 13+ years of
    freelancing career I hard-earned experience working with low budgets, building infraestructure,
    DevOps, coding back and frontend and also dealing with clients and end users.
  </p>
  <p class="mb-8">
    Not everything in life is about job: I'm a minimalist at heart, open source lover and bad
    harmonica player. I enjoy cooking for my family and friends, being italian pastas my forte. Avid
    reader (<a class="text-light-blue underline font-mono font-bold" href="#">books I've read</a>),
  </p>
  <h4 class="font-bold text-2xl mb-2 md:text-2xl">Little random fact about me.</h4>
  {#if fetchFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something goes wrong loading this...</p>
  {:else}
    <p class="mb-8">{randomFact.fact || ' '}</p>
  {/if}
  <h3 class="font-bold text-2xl pt-8 mb-2 md:text-4xl">Works.</h3>
</div>
