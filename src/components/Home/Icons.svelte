<script lang=ts>
  export let type = '';
  export let gradientFrom = '';
  export let gradientTo = '';
</script>

<div
  class="rounded-md text-black text-6xl p-3 mb-4 inline-block bg-gray relative"
  style={`background: linear-gradient(to right top, rgb(${gradientFrom})
  0%, rgb(${gradientTo}) 100%);`}
>
  {#if type === 'user'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-8 h-8">
      <path
        d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"
      />
    </svg>
  {/if}
  {#if type === 'terminal'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-8 h-8">
      <path
        d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"
      />
    </svg>
  {/if}
</div>
