<script>
  import { isSharerOpen } from '../stores/common';

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
      console.log('Link copied to clipboard');
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
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
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
  <div class="fixed inset-0 bg-black opacity-50 z-50" on:click={closeSharer} />
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="relative bg-light-black p-6 rounded-lg max-w-md">
      <button
        class="absolute top-0 right-0 m-4 text-white bg-black/50 hover:bg-black/90 rounded-full p-2"
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
      <div class="flex items-center mt-4 mb-6">
        <input
          class="text-black bg-gray-200 truncate rounded w-64 px-2 py-1 mr-2"
          type="text"
          readonly
          value={url}
        />
        <button
          class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          on:click={copyToClipboard}
        >
          Copy
        </button>
      </div>
      <div class="flex justify-between">
        <button
          class="w-1/6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
          on:click={shareOnWhatsApp}
        >
          WhatsApp
        </button>
        <button
          class="w-1/6 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mx-2"
          on:click={shareOnTwitter}
        >
          Twitter
        </button>
        <button
          class="w-1/6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-2"
          on:click={shareOnFacebook}
        >
          Facebook
        </button>
        <button
          class="w-1/6 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mx-2"
          on:click={shareOnLinkedIn}
        >
          LinkedIn
        </button>
        <button
          class="w-1/6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mx-2"
          on:click={shareByEmail}
        >
          Mail
        </button>
      </div>
    </div>
  </div>
</div>
