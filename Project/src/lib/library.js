const myHeaders = new Headers();
myHeaders.append("apikey", "o4Wtgxy5Gga9I54IHNQvl1NMAgDQDLI2");

// making long url to short url
export const shortUrl = async (body) => {
  const requestOptions = {
    method: "POST",
    redirect: "follow",
    headers: myHeaders,
    body: body,
  };

  try {
    const response = await fetch(
      `https://api.apilayer.com/short_url/hash`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    alert("Fetching error!");
  }
};

// delete short url from api
export const deleteShortUrl = async (hash) => {
  const requestOptions = {
    method: "DELETE",
    redirect: "follow",
    headers: myHeaders,
  };

  try {
    await fetch(
      `https://api.apilayer.com/short_url/hash/${hash}`,
      requestOptions
    );
    alert("Url deleted!");
  } catch (err) {
    alert("Fetching error!");
  }
};

// save in local storage
export const saveToLocalStorage = (data) => {
  if (localStorage.getItem("mobin_short_url")) {
    const localData = JSON.parse(localStorage.getItem("mobin_short_url"));
    localData.push(data);
    localStorage.setItem("mobin_short_url", JSON.stringify(localData));
  } else {
    localStorage.setItem("mobin_short_url", JSON.stringify([data]));
  }
};
// delete from local storage
export const deleteFromLocalStorage = (hash) => {
  if (localStorage.getItem("mobin_short_url")) {
    let localData = JSON.parse(localStorage.getItem("mobin_short_url"));
    localData = localData.filter((data) => data.hash !== hash);
    localStorage.setItem("mobin_short_url", JSON.stringify(localData));
  }
};
