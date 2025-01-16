import BlogPage from "./pages/BlogPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import UserPage from "./pages/UserPage.tsx";
import PostDetailPage from "./pages/PostDetailPage.tsx";

export const routes = [
  { path: "/", component: BlogPage },
  { path: "/users", component: UserPage },
  {path: "/users/:userId", component: ProfilePage},
  {path: "/posts/:postId", component: PostDetailPage}
];
