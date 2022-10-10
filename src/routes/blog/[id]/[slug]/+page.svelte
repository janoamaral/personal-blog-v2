<script>
  import { onMount } from 'svelte';
  const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL;
  import { page } from '$app/stores';
  let isLoading = false;
  let fetchFail = false;
  let markdownData = '';

  console.log($page.params.slug);
  console.log($page.params.id);
  onMount(() => {
    isLoading = true;
    Promise.allSettled([fetch(`${API_ENDPOINT}/posts/${$page.params.id}`)])
      .then(async ([rawPost]) => {
        const resPost = rawPost.value;
        return [await resPost.json()];
      })
      .then((res) => {
        markdownData = res[0].Content;
        console.log(markdownData)
      })
      .catch((err) => {
        console.error(err);
        fetchFail = true;
      })
      .finally(() => {
        isLoading = false;
      });
  });
</script>
