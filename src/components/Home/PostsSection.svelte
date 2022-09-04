<script>
  import { onMount } from 'svelte';
  import Loader from '../Loader/Loader.svelte';
  import fail from '../../static/dayum.mp4';

  let postList = [];
  let isLoading = false;
  let fetchFail = false;

  onMount(async () => {
    isLoading = true;
    //data = await fetch('https://api.github.com/users/janoamaral/repos').then((x) => x.json());

    Promise.allSettled([fetch('http://localhost:1337/posts')])
      .then(async ([resPosts]) => {
        const resPostsResponse = resPosts.value;
        return [await resPostsResponse.json()];
      })
      .then((res) => {
        postList = res[0].slice(0, 6);
        console.log(postList);
        isLoading = false;
      })
      .catch((err) => {
        console.error(err);
        fetchFail = true;
        isLoading = false;
      });
  });
</script>

<div class="mb-16">
  <h3 class="font-poppins text-2xl md:text-3xl text-light-blue mb-2">Latest posts</h3>
  <p class="text-gray text-sm mb-6">
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
  {:else if fetchFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something goes wrong loading this...</p>
    <video autoplay loop muted><source src={fail} type="video/mp4" /></video>
  {:else}
    <div class="w-full xl:columns-2 xl:space-y-5 faux-masonry xl:pt-16">
      {#each postList as post}
        <div class="w-full">
          <a
            href={post.category.Name}
            target="_BLANK"
            class="flex flex-col bg-light-black p-8 rounded-sm
          transition-all ease-in hover:scale-105 w-full xl:h-80
          align-bottom mb-4 xl:mb-0"
          >
            <p
              class="uppercase text-xs mb-2 font-bold
          tracking-widest font-mono text-dim-white"
            >
              {post.category.Name || 'Other'}
            </p>
            <p
              class="font-poppins uppercase text-lg md:text-2xl
        mb-1"
            >
              {post.Title}
            </p>
            <p class="mb-3 text-dim-white font-sm">{post.Description}</p>
            <p class="text-xs">⭐ {post.stargazers_count}</p>
          </a>
        </div>
      {/each}
    </div>
    <a href="#" class="inline-block w-full text-center p-2 rounded-sm
    bg-light-blue text-black font-mono font-bold uppercase mt-6 mb-2">Go to the blog</a>
    <small class="text-light-blue text-center w-full
    inline-block">Sorry... spanish only</small>
  {/if}
</div>
