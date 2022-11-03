<script>
  import Icon from '../Home/Icons.svelte';
</script>

  <div class="flex flex-row fixed right-0" style="top:40vh">
    <ul class="bg-light-black text-dim-white p-2 rounded-l-lg m-0 shadow-sm">
      <li>
        <a href="/">
          <Icon
            size={6}
            type="home"
            gradientFrom="173, 182, 255, 0"
            gradientTo="174, 109, 255, 0"
          />
        </a>
      </li>
      <li>
        <a href="/blog?page=1">
          <Icon
            size={6}
            type="edit"
            gradientFrom="173, 182, 255, 0"
            gradientTo="174, 109, 255, 0"
          />
        </a>
      </li>
      <li>
        <a href="/blog?page=1">
          <Icon
            size={6}
            type="edit"
            gradientFrom="173, 182, 255, 0"
            gradientTo="174, 109, 255, 0"
          />
        </a>
      </li>
    </ul>
  </div>
