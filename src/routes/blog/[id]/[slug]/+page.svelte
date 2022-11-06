<script>
  import SvelteMarkdown from 'svelte-markdown';
  import fail from '../../../../static/dayum.mp4';
  import Loader from '../../../../components/Loader/Loader.svelte';
  import Companion from '../../../../components/Companion/Companion.svelte';
  import { liveQuery } from 'dexie';
  import { db } from '../../../../stores/db.js';
  import { browser } from '$app/environment';

  const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL;
  import { page } from '$app/stores';
  let isLoading = false;
  let fetchFail = false;

  export async function load(e) {
    isLoading = true;

    if (browser) {
      const res = browser ? await db.posts.get({ id: parseInt($page.params.id) }) : [];

      if (res) {
        isLoading = false;
        post = res;
      } else {
        await loadPosts();
      }
    } else {
      await loadPosts();
    }
  }

  async function loadPosts() {
    Promise.allSettled([fetch(`${API_ENDPOINT}/posts/${$page.params.id}`)])
      .then(async ([rawPost]) => {
        const resPost = rawPost.value;
        return [await resPost.json()];
      })
      .then(async (res) => {
        await addPosts(res[0]);
        isLoading = false;
        post = res[0];
        return res[0];
      })
      .catch((err) => {
        console.error(err);
        fetchFail = true;
        return {};
      });
  }

  async function addPosts(post) {
    try {
      await db.posts.put(post);
    } catch (err) {
      console.error('Fail to save local posts', err.stack);
    }
  }

  let post = load();
</script>

<svelte:head>
  <title>{`${post.Title} - Blog - Jano Amaral`}</title>
  <meta name="description" content={post.Description} />
  <meta property="og:title" content={`${post.Title} - Blog - Jano Amaral`} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={`https://jano.amara.ar/blog/${post.id}/${post.Slug}`} />
  <meta property="og:image" content={`https://api.jano.amara.ar${post.FeatureImage?.url}`} />
  <meta name="twitter:card" content={`https://api.jano.amara.ar${post.FeatureImage?.url}`} />
</svelte:head>

<div
  class="flex flex-col container min-h-screen max-w-6xl m-auto pt-16 pb-16 lg:pt-16
text-white"
>
  <Companion />
  {#if isLoading}
    <Loader />
  {:else if fetchFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something went wrong while loading this...</p>
    <video autoplay loop muted><source src={fail} type="video/mp4" /></video>
  {:else}
    <div class="w-full p-8 text-left">
      <div class="flex flex-col container max-w-4xl m-auto text-center">
        <div class="mb-2">
          <p
            class="uppercase text-sm mb-2 font-bold
          tracking-widest font-mono inline-block"
            style="background:linear-gradient(122.25deg, #ADB6FF 12.16%, #AE6DFF 70.98%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;"
          >
            {post.category.Name || 'Other'}
          </p>
          <p class="text-sm text-dim-white mb-4">
            {new Intl.DateTimeFormat(navigator.languages[0], {
              dateStyle: 'long'
            }).format(new Date(post.PublishDate))}
          </p>
        </div>
        <div>
          <h1 class="font-bold text-4xl md:text-5xl mb-4">
            {post.Title}
          </h1>
        </div>
      </div>
      <article class="flex flex-col container max-w-4xl m-auto mt-10">
        <SvelteMarkdown source={post.Content} />
      </article>
    </div>
  {/if}
</div>
