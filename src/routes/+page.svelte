<script>
  import AboutMe from '../components/Home/AboutMe.svelte';
  import Repos from '../components/Home/RepoSection.svelte';
  import CodeStats from '../components/Home/CodeStats.svelte';
  import Posts from '../components/Home/PostsSection.svelte';

  import { onMount } from 'svelte';

  const createObserver = (elemento) => {
    let observer;
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    observer = new IntersectionObserver(callback, options);
    observer.observe(elemento);
  };

  let isAboutMeVisible = true;
  let isRepoVisible = false;
  let isStatsVisible = false;
  let isPostsVisible = false;

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      switch (entry.target.id) {
        case 'about-section':
          isAboutMeVisible = entry.isIntersecting;
          if (isAboutMeVisible) {
            isRepoVisible = false;
            isStatsVisible = false;
            isPostsVisible = false;
          }

          break;
        case 'repos-section':
          isRepoVisible = entry.isIntersecting;
          if (isRepoVisible) {
            isAboutMeVisible = false;
            isStatsVisible = false;
            isPostsVisible = false;
          }

          break;
        case 'stats-section':
          isStatsVisible = entry.isIntersecting;
          if (isStatsVisible) {
            isAboutMeVisible = false;
            isRepoVisible = false;
            isPostsVisible = false;
          }
          break;
        case 'posts-section':
          isPostsVisible = entry.isIntersecting;
          if (isPostsVisible) {
            isAboutMeVisible = false;
            isRepoVisible = false;
            isStatsVisible = false;
          }
          break;
      }
    });
  };

  onMount(() => {
    let aboutElement = document.querySelector('#about-section');
    let reposElement = document.querySelector('#repos-section');
    let statsElement = document.querySelector('#stats-section');
    let postsElement = document.querySelector('#posts-section');

    createObserver(aboutElement);
    createObserver(reposElement);
    createObserver(statsElement);
    createObserver(postsElement);
  });
</script>

<div class="flex flex-col md:flex-row container m-auto pt-16 lg:pt-16">
  <header class="p-4 md:w-1/3 md:fixed">
    <h1 class="font-bold text-5xl md:text-6xl">Jano Amaral</h1>
    <h2 class="font-mono font-bold text-2xl md:text-xl text-blue-300
    cursor">~# Freelance system analyst</h2>
    <p class="text-gray mt-10">
      👋Hi! I'm Alejandro Amaral. An all rounder. From backend to frontend, sysadmin to customer
      service. In love with web performance. Never stop learning. Currently @<a
        class="text-light-blue underline"
        href="https://kit.svelte.dev">Taggify</a
      >.
    </p>
    <ul class="font-mono font-bold tracking-wide text-xs uppercase mt-16
    md-menu hidden lg:block">
      <li
        class="mb-6 text-dim-white hover:text-white transition-all
      {isAboutMeVisible ? 'menu-active' : ''}"
      >
        <a href="#about-section">
          <span>[00] </span>
          <div
            class="inline-block border-t menu-separator transition-all
          mx-1"
          />
          About me
        </a>
      </li>
      <li
        class="mb-6 text-dim-white hover:text-white transition-all
      {isRepoVisible ? 'menu-active' : ''}"
      >
        <a href="#repos-section">
          <span>[01] </span>
          <div
            class="inline-block border-t menu-separator transition-all
          mx-1"
          />
          Repos
        </a>
      </li>
      <li
        class="mb-6 text-dim-white hover:text-white
      {isStatsVisible ? 'menu-active' : ''}"
      >
        <a href="#stats-section">
          <span>[02] </span>
          <div
            class="inline-block border-t menu-separator transition-all
          mx-1"
          />
          stats
        </a>
      </li>
      <li
        class="mb-6 text-dim-white hover:text-white
      {isPostsVisible ? 'menu-active' : ''}"
      >
        <a href="#posts-section">
          <span>[03] </span>
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
  <main
    id="scrollArea"
    class="p-4 flex flex-col md:w-1/2 min-h-screen
  scroll-smooth"
  >
    <AboutMe />
    <Repos />
    <CodeStats />
    <Posts />
  </main>
</div>
