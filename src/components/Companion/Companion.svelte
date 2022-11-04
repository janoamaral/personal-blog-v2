<script>
  import Icon from '../Home/Icons.svelte';
  import { isCollapsed } from '../../stores/common.js';

  function toggleCollapse() {
    $isCollapsed = !$isCollapsed;
  }
</script>

<div
  class={`flex flex-row fixed z-50 transition-all ${$isCollapsed ? '-right-7' : 'right-0'}`}
  style={`top:calc(35vh - ${$isCollapsed ? '0em' : '0em'})`}
>
  <ul
    class="bg-light-black/70 backdrop-blur-sm border border-light-black text-dim-white p-1
    transition-all rounded-l-lg m-0 shadow-sm"
  >
    <li on:click={toggleCollapse} class="cursor-pointer text-light-blue">
      {#if $isCollapsed}
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
    <li class={`${$isCollapsed ? 'h-0 overflow-hidden' : 'h-auto'}`}>
      <a href="/" class="hover:text-white">
        <Icon size={6} type="home" gradientFrom="173, 182, 255, 0" gradientTo="174, 109, 255, 0" />
      </a>
    </li>
    <li class={`${$isCollapsed ? 'h-0 overflow-hidden' : 'h-auto'}`}>
      <a href="/blog?page=1" class="hover:text-white">
        <Icon size={6} type="edit" gradientFrom="173, 182, 255, 0" gradientTo="174, 109, 255, 0" />
      </a>
    </li>
  </ul>
</div>
