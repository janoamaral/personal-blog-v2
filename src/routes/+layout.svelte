<script>
  import '../app.css';
  import SvelteSpotlight from 'svelte-spotlight/SvelteSpotlight.svelte';

  import { matchSorter } from 'match-sorter';

  let query = '';

  let items = [
    {
      title: 'Home',
      description: 'Ir al home'
    },
    {
      title: 'Blog',
      description: 'Ir a la página principal del blog'
    },
  ];
  $: results = matchSorter(items, query, { keys: ['title', 'description'] });
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
  modalClass={'w-[600px] max-w-[95%] bg-black shadow-lg rounded-sm p-4'}
  headerClass={'py-3 px-10 border-b-2 border-slate-100 border-b-solid'}
  inputClass="focus:outline-none bg-black text-white"
  contentClass='text-white font-bold pt-4 pb-0'
  resultIdKey="title"
  cleanQueryOnClose={true}
  on:select={(event) => {
    // DO stuff
  }}
>
  <div
    slot="result"
    let:selected
    let:result
    class={'hover:bg-slate-100 cursor-pointer text-sm px-10 py-3 w-full' + selected
      ? 'bg-slate-100'
      : ''}
  >
    {result.title}
    <p class="mb-4 text-dim-white text-sm font-normal">{result.description}</p>
  </div>

  <div slot="noResults" class="px-10 py-3 text-white text-center text-sm">No results...</div>
</SvelteSpotlight>
