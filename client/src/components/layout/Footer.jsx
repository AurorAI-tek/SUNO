import { Link } from 'react-router-dom';
import { FaMusic, FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-indigo-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <FaMusic className="text-pink-400 text-xl mr-2" />
              <span className="font-bold text-lg">Suno Helper</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Helping you get the most out of Suno's music generation features with meta tags and advanced options.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-pink-400 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-300 hover:text-pink-400 text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/meta-tags" className="text-gray-300 hover:text-pink-400 text-sm">
                  Meta Tags
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="text-gray-300 hover:text-pink-400 text-sm">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-pink-400 text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://suno.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-pink-400 text-sm"
                >
                  Suno Website
                </a>
              </li>
              <li>
                <a 
                  href="https://help.suno.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-pink-400 text-sm"
                >
                  Suno Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://sunoaiwiki.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-pink-400 text-sm"
                >
                  Suno AI Wiki
                </a>
              </li>
              <li>
                <a 
                  href="https://sunoprompt.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-pink-400 text-sm"
                >
                  Suno Prompt Library
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-pink-400"
              >
                <FaGithub className="text-xl" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-pink-400"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-pink-400"
              >
                <FaDiscord className="text-xl" />
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Join our community to share tips and prompts for creating amazing music with Suno!
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-indigo-800 mt-8 pt-4 text-center text-gray-300 text-sm">
          <p>© {currentYear} Suno Music Prompt Helper. All rights reserved.</p>
          <p className="mt-1">This is an unofficial resource not affiliated with Suno AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
