import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [info, setInfo] = useState([]);


  useEffect(() => {
    getData();
  },[]);

  const getData = async (id) => {
    const api = "https://newsapi.org/v2/everything?q=apple&from=2022-01-06&to=2022-01-06&sortBy=popularity&apiKey=3e22accad5e04d6b9acfaf028a258e18";
    let { data } = await axios.get(api)
    setInfo([data])
    console.log(data)
  };


  return (
    <View className="App">
      <View className="App-header">
        <View>
        {info.map((book, index) => (
          <View key={index}>
            <h2>{book.totalResults}</h2>
          </View>
        ))}
        </View>



      </View>
    </View>
  );
}

export default App;


