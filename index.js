const redirect = (url) => new Response(null, { status: 301, headers: { 'Location': url } })
const sbb = (str) => redirect(`https://sb.ltn.fi/userid/${str}`)
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
  return vanity ? sbb(vanity) : website
}