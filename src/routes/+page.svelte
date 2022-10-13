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

<div class="flex flex-col md:flex-row container m-auto lg:pt-16">
  <header
    class="p-4 md:w-1/3 md:fixed relative h-screen md:h-full flex place-items-center
  justify-center md:block"
  >
    <h1 class="font-bold text-6xl md:text-6xl -mt-32 md:mt-0">
      👋 Hi! I'm<br />
      <span
        style="background:linear-gradient(122.25deg, #ff4c88 12.16%, #ff8a63 70.98%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;"
        >Alejandro Amaral</span
      ><span class="opacity-70">, frelance systems analyst.</span>
    </h1>
    <p class="text-gray mt-10 hidden">
      An all rounder. From backend to frontend, sysadmin to customer service. In love with web
      performance. Never stop learning. Currently @<a
        class="text-light-blue underline"
        href="https://kit.svelte.dev">Taggify</a
      >.
    </p>
    <ul
      class="font-mono font-bold tracking-wide text-xs uppercase mt-16
    md-menu hidden lg:block"
    >
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

    <ul class="flex place-items-center text-left space-x-12 absolute left-0 bottom-24 md:bottom-36">
      <li class="hidden md:inline-block">
        <img
          class="rounded-full w-14 h-14 hidden md:inline-block"
          src="https://avatars.githubusercontent.com/u/10008708?v=4"
          alt="A picture of me"
        />
      </li>
      <li class="gradient-text">
        <a
          href="https://github.com/janoamaral"
          target="_BLANK"
          class="flex flex-row place-items-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon w-6 h-6"
            viewBox="0 0 512 512"
            fill="currentColor"
            ><title>Logo Github</title><path
              d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"
            /></svg
          >
          <p>GitHub</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>
      <li class="gradient-text">
        <a
          href="https://www.linkedin.com/in/janoamaral/"
          target="_BLANK"
          class="flex flex-row place-items-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon w-6 h-6"
            viewBox="0 0 512 512"
            fill="currentColor"
            ><title>Logo Linkedin</title><path
              d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"
            /></svg
          >
          <div>Linkedin</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>
    </ul>
  </header>
  <div class="p-4 md:w-1/2" />
  <main id="scrollArea" class="p-4 flex flex-col md:w-1/2 min-h-screen scroll-smooth">
    <AboutMe />
    <Repos />
    <CodeStats />
    <Posts />
  </main>
</div>
