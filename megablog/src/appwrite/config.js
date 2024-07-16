
import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service{
 client = new Client();
 databases;
 bucket;

 constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
 }

 async createPost({title, slug, content, feacturedImage, status, userId}){
try {
    return await this.databases.createDocument(
        conf.appwritedatabaseId,
        conf.appwritecollectionId,
        slug,
        {
            title,
            content,
            feacturedImage,
            status,
            userId

        }
    );
} catch (error) {
    console.log("Apprite service :: create post", error)
}
 }


 async updatePost( slug, {title, content, feacturedImage, status}){
try {
    return await this.databases.updateDocument(
        conf.appwritedatabaseId,
        conf.appwritecollectionId,
        slug,
        {
            title,
            content,
            feacturedImage,
            status,
        }

    )
} catch (error) {
    console.log("appwrite service :: service", error)
}
 }


 async deletePost({slug}){
try {
    await this.databases.updateDocument(
        conf.appwritedatabaseId,
        conf.appwritecollectionId,
        slug,
    )
    return true;
} catch (error) {
    console.log("appwrite service :: service",error)
    return false;
}
 }


 async getPost(slug){
    try {
       return await this.databases.updateDocument(
            conf.appwritedatabaseId,
            conf.appwritecollectionId,
            slug
        )
    } catch (error) {
        console.log("Appwrite service :: getPost :: service", error);
        return false;
    }
 }


 async getPosts(queries = [Query.equal("status", "active")]){
try {
    return await this.databases.listDocuments(
        conf.appwritedatabaseId,
        conf.appwritecollectionId,
        queries,
        
    )
} catch (error) {
    console.log("appwrite service:: getposts :: error", error);
    return false
}
 }


 async uploadFile(file){
try {
    return await this.bucket.createFile(
        conf.appwritebucketId,
        ID.unique(),
        file,

    )
} catch (error) {
    console.log("Appwrite service :: uplaodFile :: error", error)
    return false
}
 }


 async deleteFile(fileId){
    try {
        return await this.bucket.deleteFile(
            conf.appwritebucketId,
            fileId
        )
    } catch (error) {
        console.log("Appwrite services :: deleteFile :: error", error)
        return false
    }
 }


 getFilepreview(fileId){
    return this.bucket.getFilepreview(
        conf.appwritebucketId,
        fileId
    )
 }
}


const service = new Service();
export default service;