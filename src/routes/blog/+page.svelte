<script>
  import Icon from '../../components/Home/Icons.svelte';
  import fail from '../../static/dayum.mp4';
  import { page } from '$app/stores';
  import Companion from '../../components/Companion/Companion.svelte';
  import { db } from '../../stores/db.js';

  import SkeletonPostCard from '../../components/Skeleton/Skeleton-Post-Card.svelte';

  const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL;

  let fetchFail = false;

  let currentPage = Number($page.url.searchParams.get('page')) - 1;
  let totalPages = 1;
  let postPerPage = 10;

  let postList = [];
  let isLoading = false;

  const LoadPosts = async () => {
    isLoading = true;
    console.log('HIT', currentPage * postPerPage);
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
      .then(async (res) => {
        postList = res[0];
        await addPosts(res[0]);

        totalPages = Math.max(1, Math.ceil(Number(res[1]) / postPerPage));
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

  async function addPosts(posts) {
    try {
      await db.posts.bulkPut(posts);
    } catch (err) {
      console.error('Fail to save local posts', err.stack);
    }
  }
</script>

<svelte:head>
  <title>Blog - Jano Amaral</title>
  <meta
    name="description"
    content="
    Noticias, guias, opiniones, tutoriales y lo que se cruce. Lo importante es poder compartir.
    "
  />

  {#each postList as post}
    <link rel="prefetch" href={`/blog/${post.id}/${post.Slug}`} />
  {/each}
</svelte:head>

<div class="flex flex-col container min-h-screen max-w-5xl m-auto pt-16 pb-16 lg:pt-16">
  <Companion showSharer={false} />

  <header>
    <div class="text-center mb-20 px-4 text-black">
      <Icon size={6} type="edit" gradientFrom="173, 182, 255" gradientTo="174, 109, 255" />
      <h3 class="font-bold text-3xl mb-2 mt-2 md:text-4xl">
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
  {#if isLoading}
    <SkeletonPostCard />
    <SkeletonPostCard />
    <SkeletonPostCard />
    <SkeletonPostCard />
  {:else if fetchFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something went wrong while loading this...</p>
    <video autoplay loop muted><source src={fail} type="video/mp4" /></video>
  {:else}
    <div>
      {#each postList as post, i}
        <a
          href={`/blog/${post.id}/${post.Slug}`}
          class="flex flex-col sm:flex-row mb-10 hover:scale-105 transition"
        >
          <div class="md:w-1/3 md:rounded-l-lg overflow-hidden min-h-56">
            <img
              class={`h-full w-full object-cover img-thumb-${i} block
              relative blur-lg`}
              src={`${API_ENDPOINT}${post.FeatureImage.formats.thumbnail.url}`}
              alt={post.Title}
              width={`${API_ENDPOINT}${post.FeatureImage.formats.thumbnail.with}`}
              height={`${API_ENDPOINT}${post.FeatureImage.formats.thumbnail.height}`}
            />
            <img
              class={`h-full w-full object-cover img-post-${i} block relative hidden`}
              src={`${API_ENDPOINT}${post.FeatureImage.formats.small.url}`}
              alt={post.Title}
              width={`${API_ENDPOINT}${post.FeatureImage.formats.small.with}`}
              height={`${API_ENDPOINT}${post.FeatureImage.formats.small.height}`}
              on:load={(el) => {
                document.getElementsByClassName(`img-thumb-${i}`)[0].classList.add('hidden');
                el.currentTarget.classList.remove('hidden');
              }}
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
        {#if currentPage === index}
          <li
            class="inline-block rounded-full font-mono font-bold text-black text-xs
          w-6 h-6 pt-1
          text-center ml-2 cursor-pointer 
          bg-gradient-to-r from-[#4CFCFF] to-[#4C97FF]"
          >
            <a href={`/blog?page=${index + 1}`} on:click={handlePagination(index + 1)}>
              {index + 1}
            </a>
          </li>
        {:else}
          <li
            class={`inline-block rounded-full bg-light-black font-mono text-dim-white text-xs
          w-6 h-6 pt-1
          text-center ml-2 cursor-pointer 
          `}
          >
            <a href={`/blog?page=${index + 1}`} on:click={handlePagination(index + 1)}>
              {index + 1}
            </a>
          </li>
        {/if}
      {/each}
    </ul>
  {/if}
</div>
