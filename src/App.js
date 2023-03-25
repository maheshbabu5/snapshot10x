import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imgData, setImageData] = useState([])
  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: "0ed9921c48d2dac174cf5005810a1c5b",
      text: searchText,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name,license",
      format: "json",
      nojsoncallback: 1
    }
    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp) => {
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgData) => {
        return fetchFlickrImageUrl(imgData, 'q')
      })
      setImageData(arr);
    }).catch(() => {

    }).finally(() => {

    })
  }, [searchText])
  const fetchFlickrImageUrl = (photo, size) => {
    let url = `https:///farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if (size) {
      url += `_${size}`
    }
    url += `.jpg`
    return url
  }
  return (
    <>
      <center>
        <div className='text' >snapshot</div>
        <input onChange={(e) => { searchData.current = e.target.value }} value={searchData.current} />
        <button className='black' onClick={() => { setSearchText(searchData.current) }}>Search</button>
        <section>
          <button className='black' onClick={() => { setSearchText("mountains") }}>Mountains</button>
          <button className='black' onClick={() => { setSearchText("beaches") }}>Beaches</button>
          <button className='black' onClick={() => { setSearchText("birds") }}>Birds</button>
          <button className='black' onClick={() => { setSearchText("food") }}>Food</button>
        </section>
      </center>

      <section className='imageSection'>

        {imgData.map((imageurl, key) => {
          return (
            <article className='zooming'>
              < img src={imageurl} key={key}  />
            </article>
          )

        })}

      </section>
    </>
  );
}

export default App;
