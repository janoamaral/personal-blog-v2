<script>
  import { onMount } from 'svelte';
  import Icon from './Icons.svelte';
  import fail from '../../static/dayum.mp4';
  import Spinner from '../Spinner.svelte';

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
        const dataLogico = res[1];
        if (data) {
          gitRepos = data.sort((a, b) => {
            return b.stargazers_count - a.stargazers_count;
          });
          let formatedLogico = dataLogico.sort((a, b) => {
            return b.stargazers_count - a.stargazers_count;
          });
          gitRepos = gitRepos.slice(0, 3);
          gitRepos.push(...formatedLogico.slice(0, 3));
          gitRepos = gitRepos.sort((a, b) => {
            return b.stargazers_count - a.stargazers_count;
          });
        }
        isLoading = false;
      })
      .catch((err) => {
        console.error(err);
        gitFail = true;
        isLoading = false;
      });
  });
</script>

<div class="mb-16 pt-20" id="repos-section">
  <div class="text-center pb-10 text-black">
    <Icon type="star" gradientFrom="255, 225, 76" gradientTo="255, 109, 46" />
    <h3 class="font-bold text-3xl md:text-4xl mb-1 mt-2 text-white">
      My
      <span
        style="background:linear-gradient(122.25deg, #FFE14C 12.16%, #FF6D2E 70.98%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;"
      >
        most starred
      </span>repos.
    </h3>
    <p class="text-gray text-sm mb-12">
      This are some of my most popular open source projects on GitHub.
      <br />You can also see
      <a
        href="https://github.com/janoamaral/personal-blog-v2"
        aria-label="this site code"
        class="text-light-blue underline"
        target="_BLANK">this site repo</a
      >.
    </p>
  </div>
  {#if isLoading}
    <div class="flex align-middle w-full min-h-screen">
      <Spinner />
    </div>
  {:else if gitFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something went wrong while loading this...</p>
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
          <p class="font-bold text-lg md:text-2xl mb-1">{repo.name}</p>
          <p class="mb-3 text-dim-white font-sm">{repo.description}</p>
          <p class="text-xs">⭐ {repo.stargazers_count}</p>
        </a>
      {/each}
    </div>
  {/if}
</div>
