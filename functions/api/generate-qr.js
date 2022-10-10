import qr from 'qrcode'

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Max-Age': '86400'
    }
  })
}

export async function onRequestPost(context) {
  const { request } = context

  // read the body from the request
  const { url } = await request.json()

  const qrImage = await qr.toString(url, {
    type: 'svg',
    color: {
      light: '#3685FF',
      dark: '#FFFFFF'
    }
  })

  // Send all headers
  return new Response(JSON.stringify({ svg: qrImage }), {
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Max-Age': '86400',
      'Content-Type': 'application/json'
    }
  })
}
