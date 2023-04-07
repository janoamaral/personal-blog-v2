<script>
  import Icon from '../Home/Icons.svelte';
  import { isCollapsed, isSpotlightOpen, isSharerOpen } from '../../stores/common.js';

  function toggleCollapse() {
    $isCollapsed = !$isCollapsed;
  }

  function openSpotlight() {
    $isSpotlightOpen = false;
    $isSpotlightOpen = true;
  }

  function openSharer() {
    $isSharerOpen = false;
    $isSharerOpen = true;
  }
</script>

<toolbar
  class={`flex flex-row fixed z-50 transition-all ${
    $isCollapsed ? '-right-7 opacity-50 hover:opacity-100' : 'right-0'
  }`}
  style={`top:calc(35vh - ${$isCollapsed ? '-2em' : '-2em'})`}
>
  <ul
    class="bg-light-black/70 backdrop-blur-sm border border-light-black text-dim-white p-1
    transition-all rounded-l-lg m-0 shadow-sm space-y-2 py-3"
    style="line-height:0"
  >
    <li
      on:click={toggleCollapse}
      aria-label="Toggle collapse menu"
      class={`cursor-pointer text-light-blue ${$isCollapsed ? '-ml-2' : ''}`}
    >
      {#if $isCollapsed}
        <button class="-translate-x-2" aria-label="Colapsar toolbar">
          <Icon
            size={6}
            type="chevron-left"
            gradientFrom="173, 182, 255, 0"
            gradientTo="174, 109, 255, 0"
          />
        </button>
      {:else}
        <button class="-translate-x-0" aria-label="Expandir toolbar">
          <Icon
            size={6}
            type="chevron-right"
            gradientFrom="173, 182, 255, 0"
            gradientTo="174, 109, 255, 0"
          />
        </button>
      {/if}
    </li>
    <li class={`${$isCollapsed ? 'hidden' : 'block'}`}>
      <a
        href="/"
        class="inline-block rounded-xl hover:text-accent-blue hover:bg-accent-blue/20"
        aria-label="Home"
      >
        <Icon size={6} type="home" gradientFrom="173, 182, 255, 0" gradientTo="174, 109, 255, 0" />
      </a>
    </li>
    <li class={`${$isCollapsed ? 'hidden' : 'block'}`}>
      <a
        href="/blog?page=1"
        aria-label="Blog"
        class="inline-block rounded-xl hover:text-accent-violet
      hover:bg-accent-violet/20 pb-0"
      >
        <Icon size={6} type="edit" gradientFrom="173, 182, 255, 0" gradientTo="174, 109, 255, 0" />
      </a>
    </li>
    <li class={`${$isCollapsed ? 'hidden' : 'block'}`} on:click={openSpotlight}>
      <button
        aria-label="Abrir buscador"
        class="inline-block rounded-xl hover:text-accent-green
      hover:bg-accent-green/20 pb-0 cursor-pointer"
      >
        <Icon size={6} type="search" gradientFrom="0, 255, 72, 0" gradientTo="0, 255, 72, 0" />
      </button>
    </li>
    <li class={`${$isCollapsed ? 'hidden' : 'block'}`} on:click={openSharer}>
      <button
        aria-label="Compartir"
        class="inline-block rounded-xl hover:text-accent-green
      hover:bg-accent-green/20 pb-0 cursor-pointer"
      >
        <Icon size={6} type="share" gradientFrom="0, 255, 72, 0" gradientTo="0, 255, 72, 0" />
      </button>
    </li>
  </ul>
</toolbar>
