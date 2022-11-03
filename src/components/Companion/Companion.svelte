<script>
  import Icon from '../Home/Icons.svelte';
</script>

<div class="flex flex-row fixed right-0" style="top:40vh">
  <ul
    class="bg-light-black/70 backdrop-blur-sm border border-light-black text-dim-white p-2 rounded-l-lg m-0 shadow-sm"
  >
    <li>
      <a href="/" class="hover:text-white">
        <Icon size={6} type="home" gradientFrom="173, 182, 255, 0" gradientTo="174, 109, 255, 0" />
      </a>
    </li>
    <li>
      <a href="/blog?page=1" class="hover:text-white">
        <Icon size={6} type="edit" gradientFrom="173, 182, 255, 0" gradientTo="174, 109, 255, 0" />
      </a>
    </li>
  </ul>
</div>
