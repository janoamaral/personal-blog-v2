<script>
  import { onMount } from 'svelte';
  import Icon from '../../components/Home/Icons.svelte';
  import fail from '../../static/dayum.mp4';
  import { page } from '$app/stores';

  const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL;

  let fetchFail = false;

  let currentPage = Number($page.url.searchParams.get('page')) - 1;
  let totalPages = 1;
  let postPerPage = 3;

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

  onMount(() => {
    LoadPosts();
  });
</script>

<div class="flex flex-col container min-h-screen max-w-5xl m-auto pt-16 pb-16 lg:pt-16">
  <header>
    <div class="text-center mb-20 px-4">
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
        <a
          href={`/blog/${post.id}/${post.Slug}`}
          class="flex flex-col sm:flex-row mb-10 hover:scale-105 transition rounded-md"
        >
          <div class="w-full md:w-1/3">
            <img
              alt="thumbnail"
              class="inline-block h-full w-full md:rounded-md"
              style="object-fit:cover"
              src={`${API_ENDPOINT}${post.FeatureImage.formats.small.url}`}
            />
          </div>

          <div class="w-full md:w-3/4 p-8">
            <div class="mb-2">
              <p
                class="uppercase text-xs mb-2 font-bold
          tracking-widest font-mono inline-block"
                style="background:linear-gradient(122.25deg, #ADB6FF 12.16%, #AE6DFF 70.98%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;"
              >
                {post.category.Name || 'Other'}
              </p>
            </div>
            <div>
              <h2 class="font-bold text-2xl md:text-3xl mb-6">
                {post.Title}
              </h2>
              <p class="text-xs text-dim-white">
                {new Intl.DateTimeFormat(navigator.languages[0], {
                  dateStyle: 'long'
                }).format(new Date(post.PublishDate))}
              </p>
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
        >
          <a href={`/blog?page=${index + 1}`}>
            {index + 1}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>
