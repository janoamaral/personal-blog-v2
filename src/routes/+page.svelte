<script>
  import { onMount } from 'svelte';
  import Loader from '../components/Loader/Loader.svelte';

  let isLoading = false;
  let data;
  let formated = [];
  onMount(async () => {
    isLoading = true;
    data = await fetch('https://api.github.com/users/logico/repos').then((x) => x.json());
    formated = data.sort((a, b) => {
      return b.stargazers_count - a.stargazers_count;
    });
    isLoading = false;
  });
</script>

<div class="flex flex-col md:flex-row container m-auto pt-8 lg:pt-16">
  <header class="p-4 md:w-1/3 md:fixed">
    <h1 class="font-poppins text-5xl md:text-6xl text-green">Jano Amaral</h1>
    <h2 class="font-poppins text-2xl md:text-3xl">Freelance system analyst</h2>
    <p class="text-gray mt-4 text-sm">
      👋Hi! I'm Alejandro Amaral. An all rounder. From backend to frontend, sysadmin to customer
      service. In love with web performance. Never stop learning. Currently @<a
        class="text-light-blue underline"
        href="https://kit.svelte.dev">Taggify</a
      >.
    </p>
  </header>
  <div class="p-4 md:w-1/2" />
  <main class="p-4 flex flex-col md:w-1/2">
    {#if isLoading}
      <div class="flex align-middle w-full min-h-screen">
        <Loader />
      </div>
    {:else}
      {#each formated as repo}
        <div class="flex flex-col mb-8">
          <p class="font-poppins uppercase text-lg mb-1">{repo.name}</p>
          <p class="">{repo.description}</p>
        </div>
      {/each}
    {/if}
  </main>
</div>
