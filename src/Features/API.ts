import axios from 'axios';

export const AxiosRequest = async (
  endpoint: string,
  method: string,
  data: any,
) => {
  try {
    const apiURL = process.env.REACT_APP_API_URL;
    const token = getToken();
       
    console.log(token);
    
    const response = await axios({
      method: method,
      url: `${apiURL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data,
      
    });
    console.log(response.data);
    return response.data    
  } catch (error) {
    console.log(error);
    
  }
};

function getToken() {
  let userString = localStorage.getItem('user');

  if (userString) {
    const user = JSON.parse(userString);
    return user.token;
  }
  
  return "User no existe o no tiene token"
  
}