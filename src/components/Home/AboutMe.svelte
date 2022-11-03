<script>
  import { onMount } from 'svelte';
  import Icon from './Icons.svelte';

  const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL;

  let randomFact = '';
  let fetchFail = false;

  onMount(async () => {
    Promise.allSettled([fetch(`${API_ENDPOINT}/random-facts`)])
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
      });
  });
</script>

<div class="mb-8 text-md pt-2 rounded-lg" id="about-section">
  <div class="text-center mb-10 text-black">
    <Icon type="user" gradientFrom="76, 252, 255" gradientTo="76, 160, 255" />
    <h3 class="font-bold text-3xl mb-2 md:text-4xl text-white">
      Know me a
      <span
        style="background:linear-gradient(122.25deg, #4CFCFF 12.16%, #4C97FF 70.98%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;"
      >
        little better.
      </span>
    </h3>
  </div>
  <p class="mb-4">
    I'm a systems analyst based in Bolívar, a beautiful small city in Buenos Aires - Argentina. I
    specialise in help teams and clients to build products from the ground up. In 13+ years of
    freelancing career I hard-earned experience working with low budgets, building infraestructure,
    DevOps, coding back and frontend and also dealing with clients and end users.
  </p>
  <p class="mb-8">
    But not everything in me is about job: I'm a minimalist at heart, open source lover and bad
    harmonica player. I enjoy cooking for my family and friends, being italian pastas my forte. Avid
    <a class="text-light-blue underline" href="#">reader</a> and with a very ecletic taste in music:
    from classical music to K/J-Pop and everything in between. Nature conscious: I don't own a car and
    prefer walk / cycling, avoid plastics everytime I can.
  </p>
  <h4 class="font-bold text-2xl mb-2 md:text-2xl">Random fact about me.</h4>
  {#if fetchFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something went wrong while loading this...</p>
  {:else}
    <p class="mb-8">{randomFact.fact || ' '}</p>
  {/if}
</div>
