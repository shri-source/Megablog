import Parse from 'html-react-parser'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Container } from '../components/Index'


export default function Post() {
    const [post, setPost] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
    if (slug) {
        appwriteService.getPost(slug).then((post) => {
            if (post) setPost(post);
            else navigate("/")
        });
    }else navigate("/")
    },[slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/")
            }
        });
    };


  return  post ? (
    <div className='py-8'>
        <Container>
            <div className='w-full justify-center mb-4 relative border rounded-xl p-20'>
            <img src = {appwriteService.getFilepreview(post.featuredImage)}
            alt={post.title}
            className='rounded-xl'
            />
            {isAuthor && (
                <div className='absolute right-6 top-6'>
                <Link to ={`/edit-post/ ${post.$id}`}>
                <button className='mr-3 bg-green-500'>
                    Edit
                </button>
                </Link>
                <button className = "bg-red-500" onClick={deletePost}>
                    Delete
                </button>
                </div>
            )}
            </div>
            <div className='w-full mb-6'>
            <h1 className='text-2xl font-bold'>{post.title}</h1>
            </div>
            <div className='browser-css'>
            {Parse(post.content)}
            </div>
        </Container>
    </div>
  ) : null
}

