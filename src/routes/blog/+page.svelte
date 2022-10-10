<script>
  import { onMount } from 'svelte';
  import Icon from '../../components/Home/Icons.svelte';
  import Loader from '../../components/Loader/Loader.svelte';
  import fail from '../../static/dayum.mp4';

  const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL;

  let fetchFail = false;

  let currentPage = 0;
  let totalPages = 1;
  let postPerPage = 6;

  let postList = [];
  let isLoading = false;

  const LoadPosts = async () => {
    isLoading = true;
    Promise.allSettled([
      fetch(
        `${API_ENDPOINT}/posts?_start=${
          currentPage * postPerPage
        }&_limit=${postPerPage}&_sort=PublishDate:DESC`
      ),
      fetch(`${API_ENDPOINT}/posts/count`)
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
        console.error(err);
        fetchFail = true;
      })
      .finally(() => {
        isLoading = false;
      });
  };

  const handlePagination = async (pageIndex) => {
    currentPage = pageIndex - 1;
    LoadPosts();
  };

  onMount(() => {
    LoadPosts();
  });
</script>

<div class="flex flex-col container min-h-screen max-w-4xl m-auto pt-16 pb-16 lg:pt-16">
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
  {#if fetchFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something went wrong while loading this...</p>
    <video autoplay loop muted><source src={fail} type="video/mp4" /></video>
  {:else}
    <div>
      {#each postList as post}
        <a href={`/blog/${post.Slug}`} class="flex flex-row mb-8 bg-black hover:scale-105 transition rounded-md">
          <div class="w-1/2">
            <img
              alt="thumbnail"
              class="inline-block h-full w-full rounded-l-md"
              style="object-fit:cover"
              src={`${API_ENDPOINT}${post.FeatureImage.formats.small.url}`}
            />
          </div>

          <div class="w-3/4 p-8">
            <div class="mb-8">
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
            <div>
              <h2 class="font-bold text-xl md:text-3xl mb-4">
                {post.Title}
              </h2>
              <p class="mb-3 text-white font-sm">{post.Description}</p>
            </div>
          </div>
        </a>
      {/each}
    </div>
    <ul class="mb-4 text-center">
      {#each Array(totalPages) as _, index (index)}
        <li
          class={`inline-block rounded-sm bg-light-black font-mono text-dim-white text-xs
          w-5 h-6 pt-1
          text-center ml-2 cursor-pointer 
          ${currentPage === index ? 'bg-white text-black' : ''}`}
          on:click={handlePagination(index + 1)}
        >
          {index + 1}
        </li>
      {/each}
    </ul>
  {/if}
</div>
