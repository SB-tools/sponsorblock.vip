const redirect = (url) => new Response(null, { status: 301, headers: { 'Location': url } })
const sb = (endpoint, str) => redirect(`https://sb.ltn.fi/${endpoint}/${str}`)
const website = redirect('https://sponsor.ajay.app')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const handleRequest = async (request) => {
  const { pathname } = new URL(request.url)
  const username = pathname.substring(1)
  if (!username) {
    return website
  }
  const vanity = await PUBLIC_IDS.get(username.toLowerCase())
  return vanity ? sb('userid', vanity) : sb('username', username)
}