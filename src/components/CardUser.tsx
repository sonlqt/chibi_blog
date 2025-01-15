import { User } from "../interfaces/User";

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => (
  <a
    href={`/users/${user.id}`}
    className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md p-4 flex items-center gap-4 transition transform hover:scale-105 hover:shadow-lg text-left "
  >
    {/* Image round round */}
    <div className="flex-shrink-0">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlHFaukCYi_YHfwV7Cbo-Qzs8K9aJ2Ob-i8ZihTvpTIvgIPlbTHALOLdeLruRxTH1_nc&usqp=CAU"
        alt="User avatar"
        className="w-16 h-16 rounded-full object-cover"
      />
    </div>
    
    {/* User Details */}
    <div className="flex-1">
      <h3 className="text-sm font-semibold text-gray-800">{user.name}</h3>
      <p className="text-gray-600 text-sm">{user.email}</p>
      <p className="text-gray-600 text-sm capitalize">{user.gender}</p>
      <p className="text-gray-600 text-sm capitalize">{user.status}</p>
    </div>
  </a>
);

export default Card;
