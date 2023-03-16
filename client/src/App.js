import React from "react";
import PostCreate from "./post_create";
import PostList from "./post_list"

export default () => {
    return <div className="container">
        <h1>Create Post</h1>
        <PostCreate />
        <hr />
        <h1>Posts</h1>
        <PostList />
    </div>;
};