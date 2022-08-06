export const doFetch = async (url: string, method: string, data?: any): Promise<{ status: number, data: any }> => {
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: method !== 'GET' ? JSON.stringify(data) : undefined // body data type must match "Content-Type" header
  });

  const textData = await response.text()

  try {
    const parseData = JSON.parse(textData);

    return {
      status: response.status,
      data: parseData
    }
  } catch (err) {
    console.log(err)
    const parseData =  textData;

    return {
      status: response.status,
      data: parseData
    }
  }
}

export const getCookie = () => {
  const cookie = document.cookie.match('qs-token')
  return cookie
}
