<script>
  import Repos from '../components/Home/RepoSection.svelte';
  import CodeStats from '../components/Home/CodeStats.svelte';
  import Posts from '../components/Home/PostsSection.svelte';
</script>

<div class="flex flex-col md:flex-row container m-auto pt-8 lg:pt-16">
  <header class="p-4 md:w-1/3 md:fixed">
    <h1 class="font-poppins text-5xl md:text-6xl text-green">Jano Amaral</h1>
    <h2 class="font-poppins text-2xl md:text-3xl">Freelance system analyst</h2>
    <p class="text-gray mt-4">
      👋Hi! I'm Alejandro Amaral. An all rounder. From backend to frontend, sysadmin to customer
      service. In love with web performance. Never stop learning. Currently @<a
        class="text-light-blue underline"
        href="https://kit.svelte.dev">Taggify</a
      >.
    </p>
  </header>
  <div class="p-4 md:w-1/2" />
  <main class="p-4 flex flex-col md:w-1/2 min-h-screen">
    <Repos />
    <CodeStats />
    <Posts />
  </main>
</div>
