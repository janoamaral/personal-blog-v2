<script>
  import { onMount } from 'svelte';

  import '../app.css';
  import SvelteSpotlight from 'svelte-spotlight/SvelteSpotlight.svelte';

  import { matchSorter } from 'match-sorter';

  import { db } from '../stores/db';
  import { isSpotlightOpen } from '../stores/common';

  import { browser } from '$app/environment';
  const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL;

  let query = '';

  let items = [
    {
      title: ' Home',
      description: 'Ir al home',
      url: '/'
    },
    {
      title: 'Blog',
      description: 'Ir a la página principal del blog',
      url: '/blog'
    }
  ];

  onMount(async () => {
    const data = await fetch(`${API_ENDPOINT}/posts`);
    const posts = await data.json();
    items = items.concat(
      await posts.map((x) => {
        return {
          description: x.Description,
          title: `Blog - ${x.Title}`,
          url: `/blog/${x.id}/${x.Slug}`
        };
      })
    );
  });

  $: results = matchSorter(items, query, { keys: ['title', 'description'] }).slice(0, 5);
</script>

<div class="text-white font-sans" style="background:url(repeated-square-dark.webp) fixed #171718">
  <slot />
  <div
    class="fixed top-0 left-0 z-20 w-full h-24 pointer-events-none
  gradient-y-night-transparent hidden md:block opacity-80"
  />
  <div
    class="fixed bottom-0 left-0 z-20 w-full h-24 pointer-events-none gradient-y-transparent-night hidden md:block opacity-80"
  />
</div>

<SvelteSpotlight
  {results}
  bind:query
  modalClass={'w-[600px] max-w-[95%] bg-black shadow-lg rounded-lg'}
  headerClass={'py-3 px-10 border-b-2 border-slate-100 border-b-solid'}
  inputClass="focus:outline-none bg-black text-white"
  contentClass="text-white font-bold"
  resultsClass="bg-black mt-2"
  resultIdKey="title"
  searchPlaceholder="Buscar en todo el sitio"
  cleanQueryOnClose={true}
  isOpen={$isSpotlightOpen}
  on:select={(event) => {
    window.location.href = event.detail.url;
  }}
>
  <div
    slot="result"
    let:selected
    let:result
    class={`hover:bg-light-black cursor-pointer text-md pt-4 pb-2 px-4 w-full ${
      selected ? 'bg-light-black' : ''
    }`}
  >
    {result.title}
    <p class="mb-4 text-dim-white text-sm font-normal">{result.description}</p>
  </div>

  <div slot="noResults" class="px-10 py-3 text-white text-center text-sm">No results...</div>

  <div
    slot="footer"
    class="flex flex-row p-4 space-x-2 text-dim-white font-mono
  font-bold text-sm text-right w-full justify-end"
  >
    <div class="font-mono bg-light-black px-2 rounded-md">↓↑ Navegar</div>
    <div class="font-mono bg-light-black px-2 rounded-md">↲ Seleccionar</div>
  </div>
</SvelteSpotlight>
