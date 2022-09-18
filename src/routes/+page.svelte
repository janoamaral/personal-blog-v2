<script>
  import Repos from '../components/Home/RepoSection.svelte';
  import CodeStats from '../components/Home/CodeStats.svelte';
  import Posts from '../components/Home/PostsSection.svelte';

  import { onMount } from 'svelte';

  const createObserver = (elemento) => {
    let observer;
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };

    observer = new IntersectionObserver(callback, options);
    observer.observe(elemento);
  };

  const callback = () => {
    console.log('HIT');
  };

  onMount(() => {
    let boxElement = document.querySelector('#posts-section');

    createObserver(boxElement);
  });
</script>

<div class="flex flex-col md:flex-row container m-auto pt-8 lg:pt-16">
  <header class="p-4 md:w-1/3 md:fixed">
    <h1 class="font-poppins text-5xl md:text-6xl text-green">Jano Amaral</h1>
    <h2 class="font-poppins text-2xl md:text-3xl">Freelance system analyst</h2>
    <p class="text-gray mt-10">
      👋Hi! I'm Alejandro Amaral. An all rounder. From backend to frontend, sysadmin to customer
      service. In love with web performance. Never stop learning. Currently @<a
        class="text-light-blue underline"
        href="https://kit.svelte.dev">Taggify</a
      >.
    </p>
    <ul class="font-mono font-bold tracking-wide text-xs uppercase mt-16 md-menu">
      <li class="mb-6 text-dim-white hover:text-white transition-all">
        <a href="#repos-section">
          <span>01 </span>
          <div
            class="inline-block border-t menu-separator transition-all
          mx-1"
          />
          Repos
        </a>
      </li>
      <li class="mb-6 text-dim-white hover:text-white">
        <a href="#stats-section">
          <span>02 </span>
          <div
            class="inline-block border-t menu-separator transition-all
          mx-1"
          />
          stats
        </a>
      </li>
      <li class="mb-6 text-dim-white hover:text-white">
        <a href="#posts-section">
          <span>03 </span>
          <div
            class="inline-block border-t menu-separator transition-all
          mx-1"
          />
          Blog
        </a>
      </li>
    </ul>
  </header>
  <div class="p-4 md:w-1/2" />
  <main id="scrollArea" class="p-4 flex flex-col md:w-1/2 min-h-screen scroll-smooth">
    <Repos />
    <CodeStats />
    <CodeStats />
    <CodeStats />
    <CodeStats />
    <CodeStats />
    <Posts />
  </main>
</div>
