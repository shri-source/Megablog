import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components/Index';

function AllPosts() {
    const [posts, setPost] = useState([]);

    useEffect(() => {}, [])
    appwriteService.getPost([]).then((posts) =>{
    if (posts) {
        setPost(posts.documents)
    }
    })
  return (
    <div className='w-full py-8'>
        <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'> 
            <PostCard post = {post} />
            </div>
            ))}
        </div>
        </Container>
    </div>
  )
}

export default AllPosts