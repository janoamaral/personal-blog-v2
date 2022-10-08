<script>
  import { onMount } from 'svelte';
  import Loader from '../Loader/Loader.svelte';
  import Icon from './Icons.svelte';
  import fail from '../../static/dayum.mp4';

  let wakaLanguageStats = {
    data: [
      { color: '#f1e05a', name: 'JavaScript', percent: 64.33 },
      { color: '#ff3e00', name: 'Svelte', percent: 18.68 },
      { color: '#16ce40', name: 'Bash', percent: 8.9 },
      { color: '#dc9658', name: 'Docker', percent: 3.19 },
      { color: '#0c344b', name: 'Prisma', percent: 2.61 },
      { color: '#d62728', name: 'Text', percent: 1.3 },
      { color: '#fa1fa1', name: 'Lua', percent: 0.52 },
      { color: '#9467bd', name: 'Git', percent: 0.47 }
    ]
  };
  let isLoading = false;
  let gitFail = false;
</script>

<div class="mb-8 pt-20 rounded-lg" id="stats-section">
  <div class="text-center md:text-left mb-3">
    <Icon type="terminal" gradientFrom="0, 255, 72" gradientTo="0, 255, 72" />
    <h3 class="font-bold text-3xl mb-2 md:text-4xl">
      <span
        style="background:linear-gradient(122.25deg, #00FF48 12.16%, #09D18B 70.98%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;"
      >
        Code stats.
      </span>
    </h3>
  </div>
  <p class="text-gray text-sm mb-6">Languages I've been working in the last 30 days.</p>
  {#if isLoading}
    <div class="flex align-middle w-full min-h-screen">
      <Loader />
    </div>
  {:else if gitFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something goes wrong loading this...</p>
    <video autoplay loop muted><source src={fail} type="video/mp4" /></video>
  {:else}
    <figure class="mb-8">
      <embed src="https://wakatime.com/share/@logico/90be58e8-0de9-4477-9a75-e030e5da1baf.svg" />
    </figure>
  {/if}
  <h4 class="font-bold text-2xl mb-2 md:text-2xl">Tech stack</h4>
  <p class="text-gray text-sm mb-6">
    Technologies that I have a working knowledge and use to ship products.
  </p>
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
