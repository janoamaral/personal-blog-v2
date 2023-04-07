<script>
  import { isSharerOpen } from '../stores/common';
  import Icon from '../components/Home/Icons.svelte';

  export let url;
  export let title;
  const text = encodeURIComponent(`${title} ${url}`);

  const copyToClipboard = async () => {
    if (!navigator?.clipboard) {
      // Clipboard API not available
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`,
      '_blank'
    );
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent(title);
    const body = text;
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const closeSharer = () => {
    $isSharerOpen = false;
  };
</script>

<div class={`flex items-center justify-center ${$isSharerOpen ? 'block' : 'hidden'}`}>
  <div class="fixed inset-0 z-50 flex items-center justify-center z-60">
    <div class="relative bg-light-black p-6 rounded-lg max-w-md z-10 shadow-2xl">
      <button
        class="absolute top-0 right-0 m-4 text-white bg-black/40 hover:bg-black/90 rounded-full p-2"
        on:click={closeSharer}
        aria-label="Close sharer"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 class="text-2xl font-bold mb-2">Compartir</h2>
      <div class="flex items-center mt-4 mb-6 bg-black rounded-md p-2 py-3">
        <input
          class="text-white bg-black truncate rounded w-full px-2 py-1 mr-2"
          type="text"
          readonly
          value={url}
        />
        <button
          class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
          on:click={copyToClipboard}
        >
          Copiar
        </button>
      </div>
      <div class="flex justify-between">
        <button
          class="w-1/6 h-16 pt-1 bg-green hover:bg-green-600 text-white font-bold rounded-full"
          on:click={shareOnWhatsApp}
        >
          <Icon type="whatsapp" gradientFrom="0,0,0,0" gradientTo="0,0,0,0" />
        </button>
        <button
          class="w-1/6 h-16 pt-1 bg-blue-500 text-white font-bold rounded-full"
          on:click={shareOnTwitter}
        >
          <Icon type="twitter" gradientFrom="0,0,0,0" gradientTo="0,0,0,0" />
        </button>
        <button
          class="w-1/6 h-16 pt-1 pl-1 pr-8 bg-blue-800  text-white font-bold rounded-full"
          on:click={shareOnFacebook}
        >
          <Icon type="facebook" gradientFrom="0,0,0,0" gradientTo="0,0,0,0" />
        </button>
        <button
          class="w-1/6 h-16 pt-1 pl-1 pr-9 bg-blue-700  text-white font-bold rounded-full"
          on:click={shareOnLinkedIn}
        >
          <Icon type="linkedin" gradientFrom="0,0,0,0" gradientTo="0,0,0,0" />
        </button>
        <button
          class="w-1/6 h-16 pt-1 pl-1 pr-9 bg-accent-violet  text-white font-bold rounded-full"
          on:click={shareByEmail}
        >
          <Icon type="mail" gradientFrom="0,0,0,0" gradientTo="0,0,0,0" />
        </button>
      </div>
    </div>
    <div on:click={closeSharer} class="fixed inset-0 bg-black opacity-50" />
  </div>
</div>
