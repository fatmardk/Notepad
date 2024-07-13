import axios from 'axios'


const API_URL='http://localhost:8080/api/notlar/'

const createNot=async(notData,token)=>{
  const config={
    headers:{
      Authorization:`Bearer ${token}`
    }
  }

  const response =await axios.post(API_URL,notData,config)

  return response.data;
}

const getNot=async (token)=>{
  const config={
    headers:{
      Authorization:`Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL,config)
  return response.data
}

const deleteNot= async(notId,token)=>{
  const config={
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
  
  const response = await axios.delete(API_URL+notId,config);
  return response.data
}


const dataService={
  createNot,
  getNot,
  deleteNot
}

export default dataService

