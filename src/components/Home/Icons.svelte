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
        fill-rule="evenodd"
        d="M3.25 3A2.25 2.25 0 001 5.25v9.5A2.25 2.25 0 003.25 17h13.5A2.25 2.25 0 0019 14.75v-9.5A2.25 2.25 0 0016.75 3H3.25zm.943 8.752a.75.75 0 01.055-1.06L6.128 9l-1.88-1.693a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 01-1.06-.055zM9.75 10.25a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z"
        clip-rule="evenodd"
      />
    </svg>
  {/if}

  {#if type === 'star'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-8 h-8">
      <path
        fill-rule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
        clip-rule="evenodd"
      />
    </svg>
  {/if}

  {#if type === 'edit'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-8 h-8">
      <path
        d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
      />
      <path
        d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
      />
    </svg>
  {/if}
</div>
