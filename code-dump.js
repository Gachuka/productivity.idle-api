const downHandler = async (event) => {
  console.log(event.key)
  const res = await fetch(baseUrl, {        
    method: "GET",        
    mode: "cors",      
  });      
  const txt = await res.text();
  console.log(txt)
}


