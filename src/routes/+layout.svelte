<script>
  import '../app.css';
  import { goto } from '$app/navigation';
  import { db } from '../stores/db';
  import { storeActions } from '../stores/common';
  import Companion from '../components/Companion/Companion.svelte';
  const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL;
  let postList = [];
  import CommandPalette, { defineActions, createStoreMethods } from 'svelte-command-palette';
  const methods = createStoreMethods();
  import { onMount } from 'svelte';

  let isLoading = true;

  const LoadPosts = async () => {
    Promise.allSettled([fetch(`${API_ENDPOINT}/posts?_sort=PublishDate:DESC`)])
      .then(async ([rawPosts, rawPostCount]) => {
        const resPosts = rawPosts.value;
        return [await resPosts.json()];
      })
      .then(async (res) => {
        $storeActions = $storeActions.concat(
          res[0].map((post) => {
            return {
              title: post.Title,
              subTitle: post.Description,
              onRun: () => {
                goto(`/blog/${post.id}/${post.Slug}`);
              }
            };
          })
        );
        postList = res[0];
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        isLoading = false;
      });
  };

  onMount(async () => {
    await LoadPosts();
  });
</script>

<div class="text-white font-sans bg-black test">
  {#if !isLoading}
    <CommandPalette
      commands={defineActions($storeActions)}
      paletteWrapperInnerClass="paleteContainer text-white rounded-lg overflow-hidden"
      inputClass="bg-light-black text-white text-2xl font-light"
    />
  {/if}
  <Companion showSharer={false} />
  <slot />
  <div
    class="fixed top-0 left-0 z-20 w-full h-24 pointer-events-none
  gradient-y-night-transparent hidden md:block opacity-80"
  />
  <div
    class="fixed bottom-0 left-0 z-20 w-full h-24 pointer-events-none gradient-y-transparent-night hidden md:block opacity-80"
  />
</div>
