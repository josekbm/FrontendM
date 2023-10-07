import fetch from 'cross-fetch';

export const CrossFetch = async (
  endpoint: string,
  method: string,
  body: any,
) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const token = getToken();
    let jsonBody = null;
    /*if (body) {
      jsonBody = JSON.stringify(body);
    }*/
    console.log(body);
    console.log(jsonBody);
    const response = await fetch(`${url}${endpoint}`, {
      method: method,
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body,
      
    });
    console.log(response);
    

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.log(response);
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
    
  }
};

function getToken() {
  let user = localStorage.getItem('user');

  if (!user) {
    return '';
  }
  
  return JSON.parse(user).token;
  
}