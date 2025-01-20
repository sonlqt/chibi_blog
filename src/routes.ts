import BlogPage from "./pages/BlogPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import UserPage from "./pages/UserPage.tsx";
import PostDetailPage from "./pages/PostDetailPage.tsx";
import PostCreatePage from "./pages/PostCreatePage.tsx";
import PostUpdatePage from "./pages/PostUpdatePage.tsx";

export const routes = [
  { path: "/", component: BlogPage },
  { path: "/users", component: UserPage },
  { path: "/users/:userId", component: ProfilePage},
  { path: "/posts/:postId", component: PostDetailPage},
  { path: "/posts/create", component: PostCreatePage},
  { path: "posts/:postId/update", component: PostUpdatePage}
];
