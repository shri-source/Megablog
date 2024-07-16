import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../../appwrite/config';
import { Button, Input, RTE, Select } from '../Index';

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector(state => state.user.userData);

  const submit = useCallback(async (data) => {
    let file = null;
    if (data.image && data.image[0]) {
      file = await appwriteService.uploadFile(data.image[0]);
      if (post?.featuredImage) {
        await appwriteService.deleteFile(post.featuredImage);
      }
    }

    if (post) {
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
      }
      const dbPost = await appwriteService.createPost({
        ...data,
        userId: userData.$id,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  }, [navigate, post, userData]);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s-]/g, '')
        .replace(/\s+/g, '-');
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input label="Title" {...register('title')} />
      <Input label="Slug" {...register('slug')} />
      <RTE name="content" control={control} label="Content" />
      <Select label="Status" {...register('status')}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </Select>
      <Input type="file" label="Featured Image" {...register('image')} />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default PostForm;
