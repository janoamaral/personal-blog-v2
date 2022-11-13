/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL;
  let data = await fetch(`${API_ENDPOINT}/posts/${params.id}`)
  let post = await data.json()

  return {
    get: {
      ok: data.ok,
      post: post,
    }
  }
}
