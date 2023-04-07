<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let url;

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
    const text = encodeURIComponent(url);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this link: ${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareOnFacebook = () => {
    const text = encodeURIComponent(`Check out this link: ${url}`);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    const title = encodeURIComponent(document.title);
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
      '_blank'
    );
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent('Check out this link');
    const body = encodeURIComponent(`Hey, check out this link: ${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };
</script>

<div class="flex items-center justify-center">
  <div class="absolute inset-0 bg-black opacity-50 z-50"></div>
  <div class="absolute inset-0 z-50 flex items-center justify-center">
    <div class="bg-light-black p-6 rounded-lg max-w-md">
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
