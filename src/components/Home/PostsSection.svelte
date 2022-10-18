<script>
  import { onMount } from 'svelte';
  import Loader from '../Loader/Loader.svelte';
  import Icon from './Icons.svelte';
  import fail from '../../static/dayum.mp4';

  const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL;

  let postList = [];
  let isLoading = false;
  let fetchFail = false;

  onMount(async () => {
    isLoading = true;
    //data = await fetch('https://api.github.com/users/janoamaral/repos').then((x) => x.json());

    Promise.allSettled([fetch(`${API_ENDPOINT}/posts?_limit=6&_sort=PublishDate:DESC`)])
      .then(async ([resPosts]) => {
        const resPostsResponse = resPosts.value;
        return [await resPostsResponse.json()];
      })
      .then((res) => {
        postList = res[0].slice(0, 6);
        isLoading = false;
      })
      .catch((err) => {
        console.error(err);
        fetchFail = true;
        isLoading = false;
      });
  });
</script>

<div class="mb-16 pt-20" id="posts-section">
  <div class="text-center mb-20">
    <Icon type="edit" gradientFrom="173, 182, 255" gradientTo="174, 109, 255" />
    <h3 class="font-bold text-3xl mb-2 md:text-4xl">
      Checkout the latest
      <span
        style="background:linear-gradient(122.25deg, #ADB6FF 12.16%, #AE6DFF 70.98%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;"
      >
        blog posts.
      </span>
    </h3>
    <p class="text-gray text-sm mb-12">
      I love to write and share knowlegde about tech, tutorials, opinions and cooking guides.
    </p>
  </div>
  {#if isLoading}
    <div class="flex align-middle w-full min-h-screen">
      <Loader />
    </div>
  {:else if fetchFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something went wrong while loading this...</p>
    <video autoplay loop muted><source src={fail} type="video/mp4" /></video>
  {:else}
    <div
      class="w-full xl:columns-2 xl:space-y-5 faux-masonry xl:pt-16
    group"
    >
      {#each postList as post}
        <div class="w-full">
          <a
            href={`/blog/${post.id}/${post.Slug}`}
            class="flex flex-col bg-light-black p-8 rounded-sm
          transition-all ease-in hover:scale-105 w-full xl:h-96
          mb-4 xl:mb-0 items-bottom relative group-hover:opacity-50
          hover-full"
          >
            <div>
              <p
                class="uppercase text-xs mb-2 font-bold
          tracking-widest font-mono"
              >
                {post.category.Name || 'Other'}
              </p>
              <p class="text-xs text-dim-white">
                {new Intl.DateTimeFormat(navigator.languages[0], {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }).format(new Date(post.PublishDate))}
              </p>
            </div>
            <div class="xl:absolute bottom-0 left-0 w-full p-6 pb-8">
              <p
                class="font-bold text-lg md:text-2xl
        mb-4 place-items-end"
              >
                {post.Title}
              </p>
              <p class="mb-3 text-dim-white font-sm">{post.Description}</p>
            </div>
          </a>
        </div>
      {/each}
    </div>
  {/if}
  <a
    href={`/blog?page=1`}
    class="inline-block w-full text-center p-2 rounded-sm
    bg-light-blue text-black font-mono font-bold uppercase mt-6 mb-2">Go to the blog</a
  >
  <small
    class="text-light-blue text-center w-full
    inline-block">Sorry... spanish only</small
  >
</div>
