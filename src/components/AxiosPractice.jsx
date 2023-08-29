import axios from "axios";
import { useEffect, useState } from "react";

// api url saved in .env file
const API_URL = import.meta.env.VITE_API_URL;


//post function using axios
//get function using axios
const fetchPosts = async () => {
  try {
    const { data } = await axios.get(`${API_URL}?_limit=3`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//put function using axios
const updatePosts = async (id, updatedPost) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, updatedPost);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//delete function using axios
const deletePost = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (err) {
    console.log(err);
  }
};
const createPost = async (newPost) => {
  try {
    const { data } = await axios.post(API_URL, newPost);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const AxiosPractice = () => {
  //post state for post in array
  const [posts, setPosts] = useState([]);



  //managing side effect in calling api
  useEffect(() => {
    const getPosts = async () => {
      const postData = await fetchPosts();
      setPosts(postData);
    };
    getPosts();
  }, []);

  //updatePost function
  const handleUpdatePost = async (id) => {
    const updatedPost = {
        title: "Updated Post",
        body: `This is an updated post. ${Date.now()}`,
        userId: 1
    }

    const post = await updatePosts(id, updatedPost);
    setPosts(posts.map((p) => (p.id === id ? post : p)))
  }

  //deletePost function
  const handleDeletePost = async (id) => {
    await deletePost(id);
    setPosts(posts.filter((p) => p.id !== id));
  }

  //createPost function
  const handleCreatePost = async () => {
    const newPost = {
        title: "New Post",
        body: `This is a new Post. ${Date.now()}`,
        userId: 1
    }

    const post = await createPost(newPost);
    setPosts([post, ...posts]);
  }

  return (
    <div>
      AxiosPractice
      <div>
      <div>
        <button className="border border-black ml-2 mb-2"
        onClick={handleCreatePost}
        >Create Post</button>
      </div>
        {posts.map((post, id) => {
          return (
            <div key={id}>
              <div className="border border-black ml-2 mb-2">
                <p className="ml-2">{post.title}</p>
                <p className="ml-2">{post.body}</p>
                <button
                  className="border border-black ml-2 mb-2"
                  onClick={() => handleUpdatePost(post.id)}>
                  Update
                </button>
                <button
                  className="border border-black ml-2 mb-2"
                  onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AxiosPractice;
