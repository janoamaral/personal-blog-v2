<script>
  import Icon from '../../components/Home/Icons.svelte';
  import fail from '../../static/dayum.mp4';
  import { page } from '$app/stores';
  import Companion from '../../components/Companion/Companion.svelte';

  const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL;

  let fetchFail = false;

  let currentPage = Number($page.url.searchParams.get('page')) - 1;
  let totalPages = 1;
  let postPerPage = 10;

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
        totalPages = Math.max(1, Number(res[1]) / postPerPage);
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

  $: LoadPosts();
</script>

<div class="flex flex-col container min-h-screen max-w-5xl m-auto pt-16 pb-16 lg:pt-16">
  <Companion />

  <header>
    <div class="text-center mb-20 px-4 text-black">
      <Icon size={8} type="edit" gradientFrom="173, 182, 255" gradientTo="174, 109, 255" />
      <h3 class="font-bold text-3xl mb-2 md:text-4xl">
        <span
          style="background:linear-gradient(122.25deg, #ADB6FF 12.16%, #AE6DFF 70.98%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;"
        >
          Blog.
        </span>
      </h3>
      <p class="text-gray text-sm mb-12">
        Noticias, guias, opiniones, tutoriales y lo que se cruce. Lo importante es poder compartir.
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
              <h2 class="font-bold text-2xl md:text-3xl mb-3">
                {post.Title}
              </h2>
              <p class="mb-6">
                {post.Description}
              </p>
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
          <a href={`/blog?page=${index + 1}`} on:click={handlePagination(index + 1)}>
            {index + 1}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>
