import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    setCounter(pageNumber - 1);
  }


  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log("Reacl",counter,pageNumbers.length);

  function Prev() {
    if(counter >= 1) {
      const cnt=  counter -1  ;
      setCurrentPage(pageNumbers[cnt]);
      setCounter(cnt)
    }
  }
  function Next() {
    if(counter < pageNumbers.length -1) {
    const cnt=  counter +1  ;
    setCurrentPage(pageNumbers[cnt]);
    setCounter(cnt)
  }
  }
  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <button onClick={Prev}>
       Prev
      </button>
      <button  onClick={Next}>Next</button>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />  
     
    </div>
  );
};

export default App;
