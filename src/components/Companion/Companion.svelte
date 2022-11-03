<script>
  import Icon from '../Home/Icons.svelte';

  let isCollapsed = false;

  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }
</script>

<div class="flex flex-row fixed z-50 right-0 transition-all" style="top:40vh">
  <ul
    class="bg-light-black/70 backdrop-blur-sm border border-light-black text-dim-white p-1
    transition-all rounded-l-lg m-0 shadow-sm"
  >
    <li class={`${isCollapsed ? 'h-0 overflow-hidden' : 'block'}`}>
      <a href="/" class="hover:text-white">
        <Icon size={6} type="home" gradientFrom="173, 182, 255, 0" gradientTo="174, 109, 255, 0" />
      </a>
    </li>
    <li class={`${isCollapsed ? 'h-0 overflow-hidden' : 'block'}`}>
      <a href="/blog?page=1" class="hover:text-white">
        <Icon size={6} type="edit" gradientFrom="173, 182, 255, 0" gradientTo="174, 109, 255, 0" />
      </a>
    </li>

    <li on:click={toggleCollapse} class="cursor-pointer">
      {#if isCollapsed}
        <Icon
          size={6}
          type="expand"
          gradientFrom="173, 182, 255, 0"
          gradientTo="174, 109, 255, 0"
        />
      {:else}
        <Icon
          size={6}
          type="collapse"
          gradientFrom="173, 182, 255, 0"
          gradientTo="174, 109, 255, 0"
        />
      {/if}
    </li>
  </ul>
</div>
