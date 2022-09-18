<script>
  import { onMount } from 'svelte';
  import Loader from '../Loader/Loader.svelte';
  import fail from '../../static/dayum.mp4';

  let gitRepos = [];
  let isLoading = false;
  let gitFail = false;

  onMount(async () => {
    isLoading = true;
    //data = await fetch('https://api.github.com/users/janoamaral/repos').then((x) => x.json());

    Promise.allSettled([
      fetch('https://api.github.com/users/janoamaral/repos'),
      fetch('https://api.github.com/users/logico/repos')
    ])
      .then(async ([resJano, resLogico]) => {
        const resJanoResponse = resJano.value;
        const resLogicoResponse = resLogico.value;
        return [await resJanoResponse.json(), await resLogicoResponse.json()];
      })
      .then((res) => {
        const data = res[0];
        gitRepos = data.sort((a, b) => {
          return b.stargazers_count - a.stargazers_count;
        });
        let formatedLogico = res[1].sort((a, b) => {
          return b.stargazers_count - a.stargazers_count;
        });
        gitRepos = gitRepos.slice(0, 3);
        gitRepos.push(...formatedLogico.slice(0, 3));
        gitRepos = gitRepos.sort((a, b) => {
          return b.stargazers_count - a.stargazers_count;
        });
        isLoading = false;
      })
      .catch((err) => {
        console.error(err);
        gitFail = true;
        isLoading = false;
      });
  });
</script>

<div class="mb-32" id='repos-section'>
  <h3 class="font-poppins text-2xl md:text-3xl text-light-blue mb-2">My most starred repos</h3>
  <p class="text-gray text-sm mb-12">
    This are some of my most popular repos on GitHub. If you want to see this site code you can do
    it
    <a
      href="https://github.com/janoamaral/personal-blog-v2"
      class="text-light-blue underline"
      target="_BLANK">here</a
    >
  </p>
  {#if isLoading}
    <div class="flex align-middle w-full min-h-screen">
      <Loader />
    </div>
  {:else if gitFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something goes wrong loading this...</p>
    <video autoplay loop muted><source src={fail} type="video/mp4" /></video>
  {:else}
    <div class="group">
      {#each gitRepos as repo}
        <a
          href={repo.html_url}
          target="_BLANK"
          class="flex flex-col mb-4 bg-light-black p-8 rounded-sm
          transition-all ease-in hover:scale-110 group-hover:opacity-50
          hover-full"
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
    </div>
  {/if}
</div>
