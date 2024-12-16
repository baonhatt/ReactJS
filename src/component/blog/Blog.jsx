import React, { useEffect, useState } from "react";

const Blog = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPerPage, setBlogPerPage] = useState(3);


  /* Search */

  const [searchInput, setSearchInput] = useState('');

  const searchHandle = (value) => {
    setSearchInput(value);
    if (value.trim() === '') {
      fetchPost();
    }
  }

  const submitSearch = (e) => {
    e.preventDefault();
  
      const filteredPosts = post.filter(item => 
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setPost(filteredPosts);
    
  }

  const  fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPost(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  // Tính toán các bài viết hiện tại dựa trên trang
  const indexOfLastPost = currentPage * blogPerPage;
  const indexOfFirstPost = indexOfLastPost - blogPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <form className="max-w-md mx-auto p-4" onSubmit={submitSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={searchInput}
            onChange={(e) => { searchHandle(e.target.value)}}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Title, UserID..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        currentPosts.map((item) => (
          <div key={item.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p>{item.body}</p>
          </div>
        ))
      )}

      {/* Phân trang */}
      <div className="flex justify-center mt-4">
        {/* Nút Previous */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-4 py-2 border rounded bg-white text-blue-500"
        >
          Previous
        </button>
        {Array.from({ length: 5 }, (_, index) => {
          const totalPages = Math.ceil(post.length / blogPerPage);
          let pageNumber;

          if (currentPage <= 3) {
            pageNumber = index + 1; // Hiển thị từ 1 đến 5
          } else if (currentPage + 2 >= totalPages) {
            pageNumber = totalPages - 4 + index; // Hiển thị 5 trang cuối
          } else {
            pageNumber = currentPage - 2 + index; // Hiển thị 5 trang xung quanh trang hiện tại
          }

          return (
            pageNumber > 0 &&
            pageNumber <= totalPages && (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`mx-1 px-4 py-2 border rounded ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                }`}
              >
                {pageNumber}
              </button>
            )
          );
        })}
        {/* Nút Next */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(post.length / blogPerPage)}
          className="mx-1 px-4 py-2 border rounded bg-white text-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blog;
