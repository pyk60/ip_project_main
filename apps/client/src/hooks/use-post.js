import { useState } from "react";

export function useCreatePost() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: "", content: "" });
    const [newImage, setNewImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setNewImage(file);
        }
    };

    const handlePostSubmit = () => {
        const newPostData = {
            id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1, // ID가 1부터 시작하도록 수정
            channelName: "New Channel Name",
            avatar: require("../img/default-avatar.jpg"), // 상대 경로 문제 발생 가능
            contentText: newPost.content,
            likeCount: 0,
            commentCount: 0,
            comments: [],
            image: newImage ? URL.createObjectURL(newImage) : require("../img/post-image.png"), // 이미지 경로 처리
        };

        setPosts((prevPosts) => [...prevPosts, newPostData]);

        // 초기화
        setNewPost({ title: "", content: "" });
        setNewImage(null);
        setImagePreview(null);
    };

    const handleLike = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
            )
        );
    };

    const handleAddComment = (postId, comment) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                          ...post,
                          comments: [
                              ...post.comments,
                              { username: "사용자 이름", text: comment },
                          ],
                          commentCount: post.commentCount + 1,
                      }
                    : post
            )
        );
    };

    return {
        posts,
        newPost,
        setNewPost,
        newImage,
        imagePreview,
        handleImageChange,
        handlePostSubmit,
        handleLike,
        handleAddComment,
    };
}
