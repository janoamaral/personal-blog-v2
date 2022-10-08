<script>
  import '../app.css';
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</svelte:head>

<div
  class="text-white font-sans"
  style="background:url(noisy_net.webp) #1a1b26"
>
  <slot />
  <div
    class="fixed top-0 left-0 z-20 w-full h-24 pointer-events-none
  gradient-y-night-transparent hidden md:block opacity-80"
  />
  <div
    class="fixed bottom-0 left-0 z-20 w-full h-24 pointer-events-none gradient-y-transparent-night hidden md:block opacity-80"
  />
</div>
