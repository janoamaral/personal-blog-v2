<script>
  import Spinner from '../Spinner.svelte';
  import Icon from './Icons.svelte';
  import fail from '../../static/dayum.mp4';

  let isLoading = false;
  let gitFail = false;
</script>

<div class="mb-8 pt-20 rounded-lg" id="stats-section">
  <div class="text-center pb-10 text-black">
    <Icon type="terminal" gradientFrom="0, 255, 72" gradientTo="0, 255, 72" />
    <h3 class="font-bold text-3xl mb-2 mt-2 md:text-4xl text-white">
      Tech stack and
      <span
        style="background:linear-gradient(122.25deg, #00FF48 12.16%, #09D18B 70.98%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;"
      >
        code stats.
      </span>
    </h3>
    <p class="text-gray text-sm mb-6">Languages I've been working in the last 30 days.</p>
  </div>
  {#if isLoading}
    <div class="flex align-middle w-full min-h-screen">
      <Spinner />
    </div>
  {:else if gitFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something went wrong while loading this...</p>
    <video autoplay loop muted><source src={fail} type="video/mp4" /></video>
  {:else}
    <figure class="mb-8">
      <embed src="https://wakatime.com/share/@logico/90be58e8-0de9-4477-9a75-e030e5da1baf.svg" />
    </figure>
  {/if}
  <div class="text-center">
    <h4 class="font-bold text-2xl mb-2 md:text-2xl">Tech stack</h4>
    <p class="text-gray text-sm mb-6">
      Technologies that I have a working knowledge and use to ship products.
    </p>
  </div>
  <iframe
    loading="lazy"
    title="tech stack"
    src="stack.html"
    class="pt-4"
    data-embed-code="1d462e5f58fb0d0f21f72d7723f472"
    data-stack-embed="true"
    frameborder="0"
  />

  <script src="client-code.js" async></script>
</div>
