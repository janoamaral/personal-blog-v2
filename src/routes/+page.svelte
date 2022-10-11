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
  <header class="p-4 md:w-1/3 md:fixed relative h-full">
    <h1 class="font-bold text-5xl md:text-6xl cursor">
      👋 Hi! I'm<br />
      <span
        style="background:linear-gradient(122.25deg, #ff4c88 12.16%, #ff8a63 70.98%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;"
        >Jano Amaral</span
      >, freelance systems analyst
    </h1>
    <p class="text-gray mt-10">
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

    <ul class="flex flex-row place-items-center space-x-12 absolute bottom-36">
      <li>
        <img
          class="rounded-full w-12 h-12"
          src="https://avatars.githubusercontent.com/u/10008708?v=4"
          alt="A picture of me"
        />
      </li>
      <li>
        <a
          href="https://github.com/janoamaral"
          target="_BLANK"
          class="flex flex-row
        place-items-center space-x-2"
        >
          <div>GitHub</div>
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
      <li>
        <a
          href="https://www.linkedin.com/in/janoamaral/"
          target="_BLANK"
          class="flex flex-row
        place-items-center space-x-2"
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
