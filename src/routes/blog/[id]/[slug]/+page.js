/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let data = await fetch(`http://backend:1337/posts/${params.id}`)
  let post = await data.json()

  return {
    get: {
      post: post,
    }
  }
}
