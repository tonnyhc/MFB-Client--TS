type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

const hostUrl = "http://localhost:8000/";

const requester = async (url: string, method: RequestMethod, body?: any, token?: string) => {
  if (!token) {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    token = userData.token || null;
  }

  let headers: Record<string, string> = {
    'Authorization': `Token ${token}`
  }

  let options: RequestInit = {
    method,
    headers,
  };

  // Checking if the request has a body to apply a content type to it and to stringify the body to JSON
  if (body) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(hostUrl + url, options);

    // Checking if the status is 204 (NO CONTENT) to return the response without parsing it to an object
    if (response.status === 204) {
      return response;
    }

    if (!response.ok) {
      // If the response is not OK (e.g., has an error) throw the error response
      const data = await response.json();
      throw data;
    }

    // If everything goes as expected, return the response as an object
    return response.json();
  } catch (e) {
    throw e;
  }
};

// API functions
export const post = async (url: string, body: any) => {
  try {
    const data = await requester(url, "POST", body);
    return data;
  } catch (e) {
    throw e;
  }
};

export const get = async (url: string) => {
  try {
    const data = await requester(url, "GET");
    return data;
  } catch (e) {
    throw e;
  }
};

export const patch = async (url: string, body: any) => {
  try {
    const data = await requester(url, "PATCH", body);
    return data;
  } catch (e) {
    throw e;
  }
};

export const del = async (url: string, body?: any) => {
  try {
    const data = await requester(url, "DELETE", body);
    return data;
  } catch (e) {
    throw e;
  }
};
