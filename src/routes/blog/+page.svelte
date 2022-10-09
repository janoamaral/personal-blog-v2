<script>
  import { onMount } from 'svelte';
  import Icon from '../../components/Home/Icons.svelte';
  import Loader from '../../components/Loader/Loader.svelte';
  import fail from '../../static/dayum.mp4';

  let fetchFail = false;

  let currentPage = 1;
  let totalPages = 1;
  let postPerPage = 2;

  let postList = [];
  let isLoading = false;

  onMount(async () => {
    isLoading = true;
    Promise.allSettled([
      fetch(
        `http://localhost:1337/posts?_start=${currentPage}&_limit=${postPerPage}&_sort=PublishDate:DESC`
      ),
      fetch('http://localhost:1337/posts/count')
    ])
      .then(async ([rawPosts, rawPostCount]) => {
        const resPosts = rawPosts.value;
        const resPostsCount = rawPostCount.value;
        return [await resPosts.json(), await resPostsCount.json()];
      })
      .then((res) => {
        postList = res[0];

        totalPages = Number(res[1]) / postPerPage;
      })
      .catch((err) => {
        fetchFail = true;
      })
      .finally(() => {
        isLoading = false;
      });
  });
</script>

<div class="flex flex-col container max-w-4xl m-auto pt-16 lg:pt-16">
  <header>
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
  </header>
  {#if isLoading}
    <Loader />
  {:else if fetchFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something went wrong while loading this...</p>
    <video autoplay loop muted><source src={fail} type="video/mp4" /></video>
  {:else}
    {#each postList as post}
      <div class="w-full">
        <a
          href={post.category.Name}
          target="_BLANK"
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
  {/if}
</div>
