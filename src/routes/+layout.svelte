<script>
  import '../app.css';
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</svelte:head>

<div class="bg-black text-white font-sans">
  <slot />
  <div class="fixed top-0 left-0 z-20 w-full h-32 pointer-events-none
  gradient-y-night-transparent hidden md:block"></div>
  <div class="fixed bottom-0 left-0 z-20 w-full h-32 pointer-events-none gradient-y-transparent-night hidden md:block"></div>
</div>
