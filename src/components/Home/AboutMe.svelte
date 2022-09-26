<script>
  import { onMount } from 'svelte';
  import Loader from '../Loader/Loader.svelte';
  import fail from '../../static/dayum.mp4';
  let randomFact = {};
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
  <h3 class="font-bold text-2xl mb-2 md:text-4xl">Who Am I</h3>
  <p class="mb-4">
    I'm a systems analyst based in Bolívar, Buenos Aires - Argentina. I specialise in help teams and
    clients build products from the ground up. In 13+ years of freelancing career I hard-earned
    experience working with low budgets, building infraestructure, DevOps, coding back and frontend
    and also dealing with clients and end users.
  </p>
  <p class="mb-8">
    But not everything is work: I'm a minimalist at heart, open source lover and bad harmonica
    player. I enjoy cooking for my family and friends, being italian pastas my forte.
  </p>
  <p class="mb-8">
    Avid reader (there is a <a class="text-light-blue underline" href="#">dedicated section</a>)
  </p>
  <h4 class="font-bold text-2xl mb-2 md:text-2xl">Random fact about me</h4>
  {#if isLoading}
    <div class="flex align-middle w-full min-h-screen">
      <Loader />
    </div>
  {:else if fetchFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something goes wrong loading this...</p>
    <video autoplay loop muted><source src={fail} type="video/mp4" /></video>
  {:else}
    <p class="mb-8">{randomFact?.fact}</p>
  {/if}
</div>
