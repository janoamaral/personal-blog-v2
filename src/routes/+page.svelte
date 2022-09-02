<script>
  import { onMount } from 'svelte';
  let data;
  let formated = [];
  onMount(async () => {
    data = await fetch('https://api.github.com/users/janoamaral/repos').then((x) => x.json());
    formated = data.sort((a, b) => {
      return b.stargazers_count - a.stargazers_count;
    });
    formated = formated.slice(0, 5);
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
    {#each formated as repo}
      <div class="max-w-sm w-full lg:max-w-full lg:flex mb-4">
        <div
          class="bg-black rounded-b lg:rounded-b-none lg:rounded-r p-4
          flex flex-col justify-between leading-normal shadow-sm"
        >
          <div class="mb-8">
            <p class="text-sm text-gray-600 flex items-center">
              <svg
                class="fill-current text-gray-500 w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
                />
              </svg>
              {repo.language || 'Other'}
            </p>
            <div class="text-gray-900 font-bold text-xl mb-2">
              {repo.name}
            </div>
            <p class="text-gray-700 text-base">
              {repo.description}
            </p>
          </div>
          <div class="flex items-center">
            <img
              class="w-10 h-10 rounded-full mr-4"
              src="/img/jonathan.jpg"
              alt="Avatar of Jonathan Reinink"
            />
            <div class="text-sm">
              <p class="text-gray-900 leading-none">Jonathan Reinink</p>
              <p class="text-gray-600">Aug 18</p>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </main>
</div>
