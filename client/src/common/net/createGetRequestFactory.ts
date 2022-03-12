import {reduce} from 'lodash'


const createAuthorizationToken = (token: string) =>
   `Bearer ` + token

const createUrlQueryParameterPostfix = (queryParameters) =>
  reduce(
    queryParameters,
    (memo, value, name) =>
      (memo === '' ? '?' : memo + '&') + `${name}=${encodeURIComponent(value)}`,
    ''
  )

  const dispatchGetRequest = async (url: string, queryParameters = {}) => {
    const options: RequestInit = {
      mode : 'cors'
    }
    const resolvedUrl = url + createUrlQueryParameterPostfix(queryParameters)
    let response
    let jsonData
    response = await fetch(resolvedUrl, options)
    jsonData = await response.json()
    return jsonData
  }


const dispatchPostRequest = async (url: string, json_body: {}, queryParameters = {}) => {
  const options: RequestInit = {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json_body)
}
  const resolvedUrl = url + createUrlQueryParameterPostfix(queryParameters)
    let response
    let jsonData
    response = await fetch(resolvedUrl, options)
    jsonData = await response.json()
    return jsonData
}


const createGetRequestFactory = (apiBaseUrl: string) => {
  return (path, queryParameters = {}) => {
    const apiEndpoint =`${apiBaseUrl}${path}`

    return dispatchGetRequest(apiEndpoint, queryParameters)
  }
}


const createPostRequestFactory = (apiBaseUrl: string) => {
  return (path, body, queryParameters = {}) => {
    const apiEndpoint =`${apiBaseUrl}${path}`

    return dispatchPostRequest(apiEndpoint, body, queryParameters)
  }
}


export {
  createGetRequestFactory,
  createPostRequestFactory
}
