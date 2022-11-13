<script>
  export const prerender = true;

  import SvelteMarkdown from 'svelte-markdown';
  import fail from '../../../../static/dayum.mp4';
  import Companion from '../../../../components/Companion/Companion.svelte';

  import SkeletonArticle from '../../../../components/Skeleton/Skeleton-Article.svelte';

  let isLoading = false;
  let fetchFail = false;

  /** @type {import('./$types').PageData} */
  export let data;

  let post = data.get.post;
  fetchFail = !data.get.ok;
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
    <SkeletonArticle />
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
            {new Intl.DateTimeFormat('en-US', {
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
