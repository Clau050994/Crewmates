import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <nav>
      <ul className='sidebar'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
      </ul>
    </nav>
  );
}