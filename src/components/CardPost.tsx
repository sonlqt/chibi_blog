import { Post } from "../interfaces/Post";

interface CardProps {
  post: Post;
}

const Card: React.FC<CardProps> = ({ post }) => (
  <a
    href={`/post/${post.id}`}
    className="block w-full max-w-xs mx-auto bg-white rounded-lg shadow-md p-4 transition transform hover:scale-105 hover:shadow-lg"
  >
    {/* Image Holder */}
    <div className="w-full h-40 rounded-lg overflow-hidden">
      <img
        src="https://cdn.discordapp.com/attachments/1077608638585254042/1329019457598783558/defaultimg.png?ex=6788d152&is=67877fd2&hm=a92215194fcc6be7acf68eb96d543d4b1c9be6602732064c52ab6646ff21179f&"
        alt="Post image"
        className="w-full h-full object-cover"
      />
    </div>
    {/* Title */}
    <h3 className="text-lg font-semibold text-gray-800 mt-3">{post.title}</h3>
    {/* Body */}
    <p className="text-gray-600 text-sm mt-2">
      {post.body.substring(0, 60)}...
    </p>
  </a>
);

export default Card;
