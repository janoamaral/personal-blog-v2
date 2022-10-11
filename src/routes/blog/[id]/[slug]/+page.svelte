<script>
  import SvelteMarkdown from 'svelte-markdown';
  import fail from '../../../../static/dayum.mp4';
  const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL;
  import { page } from '$app/stores';
  let isLoading = false;
  let fetchFail = false;

  export function load(e) {
    isLoading = true;
    Promise.allSettled([fetch(`${API_ENDPOINT}/posts/${$page.params.id}`)])
      .then(async ([rawPost]) => {
        const resPost = rawPost.value;
        return [await resPost.json()];
      })
      .then((res) => {
        post = res[0];
      })
      .catch((err) => {
        console.error(err);
        fetchFail = true;
      })
      .finally(() => {
        isLoading = false;
      });
  }

  let post = load();
</script>

<div class="flex flex-col container min-h-screen max-w-6xl m-auto pt-16 pb-16 lg:pt-16
text-white">
  {#if isLoading}
    <p>Test</p>
  {:else if fetchFail}
    <p class="text-gray text-sm mb-6 text-center">⚠️ Something went wrong while loading this...</p>
    <video autoplay loop muted><source src={fail} type="video/mp4" /></video>
  {:else}
    <div class="w-full p-8 text-left">
      <div class="flex flex-col container max-w-4xl m-auto">
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
          <h1 class="font-bold text-3xl md:text-4xl mb-4">
            {post.Title}
          </h1>
          <p class="text-md mb-12 text-md">
            {post.Description}
          </p>
        </div>
      </div>
      <img
        alt="thumbnail"
        class="inline-block h-full w-full md:rounded-md"
        style="object-fit:cover"
        src={`${API_ENDPOINT}${post.FeatureImage.formats.large.url}`}
      />
      <article class="flex flex-col container max-w-4xl m-auto mt-10">
        <SvelteMarkdown source={post.Content} />
      </article>
    </div>
  {/if}
</div>
