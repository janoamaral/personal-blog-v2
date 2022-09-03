<script>
  import { onMount } from 'svelte';
  import Loader from '../components/Loader/Loader.svelte';

  let isLoading = false;
  let data;
  let formated = [];

  onMount(async () => {
    isLoading = true;
    data = await fetch('https://api.github.com/users/janoamaral/repos').then((x) => x.json());
    formated = data.sort((a, b) => {
      return b.stargazers_count - a.stargazers_count;
    });
    formated = formated.slice(0, 5);
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
  <main class="p-4 flex flex-col md:w-1/2 min-h-screen">
    {#if isLoading}
      <div class="flex align-middle w-full min-h-screen">
        <Loader />
      </div>
    {:else}
      <h3 class="font-poppins text-2xl md:text-3xl text-light-blue mb-2">My most starred repos</h3>
      <p class="text-gray text-sm mb-6">This are some of my most popular repos on github.</p>
      {#each formated as repo}
        <a
          href={repo.html_url}
          target="_BLANK"
          class="flex flex-col mb-4 bg-light-black p-8 rounded-sm
          transition-all ease-in hover:scale-105"
        >
          <p
            class="uppercase text-xs mb-2 font-bold
          tracking-widest font-mono text-dim-white"
          >
            {repo.language || 'Other'}
          </p>
          <p class="font-poppins uppercase text-lg md:text-2xl mb-1">{repo.name}</p>
          <p class="mb-3 text-dim-white font-sm">{repo.description}</p>
          <p class="text-xs">⭐ {repo.stargazers_count}</p>
        </a>
      {/each}
    {/if}
  </main>
</div>
