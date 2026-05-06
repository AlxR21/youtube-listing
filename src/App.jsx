import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [ytList, setYtList] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      const url =
        "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest";
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        const dataObjects = data.data.data;
        console.log(dataObjects);

        setYtList(dataObjects);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return(
    <>
    <h1>Yt List</h1>
    {
      ytList.map((item) => {
        return(
          <div key={item.id} className='yt-card'>
            <img src={item.items.snippet.thumbnails.default.url} alt={item.items.snippet.title} className='yt-thumbnail' />
            <h2 className='yt-title'>{item.items.snippet.title}</h2>
            <p className='yt-channel'>{item.items.snippet.channelTitle}</p>
            <p className='yt-views'>{item.items.statistics.viewCount} views</p>
          </div>
        )
      })
    }
    </>
  )
}

export default App
