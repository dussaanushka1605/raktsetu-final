
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 dark:text-white border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <Link 
              to="/"
              className="text-2xl font-bold text-blood tracking-tight flex items-center"
            >
              <span className="mr-1">Rakt</span>
              <span className="text-foreground dark:text-white">Setu</span>
            </Link>
            <p className="text-muted-foreground dark:text-gray-300">
              Bridging the gap between blood donors and recipients, one donation at a time.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground dark:text-gray-400 hover:text-blood transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground dark:text-gray-400 hover:text-blood transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground dark:text-gray-400 hover:text-blood transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground dark:text-gray-300 hover:text-blood transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/find-donor" className="text-muted-foreground dark:text-gray-300 hover:text-blood transition-colors">
                  Find a Donor
                </Link>
              </li>
              <li>
                <Link to="/become-donor" className="text-muted-foreground dark:text-gray-300 hover:text-blood transition-colors">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground dark:text-gray-300 hover:text-blood transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground dark:text-gray-300 hover:text-blood transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Contact</h3>
            <p className="text-muted-foreground dark:text-gray-300">
              For any queries or emergency needs, please contact us at: 
              <a href="mailto:contact@raktsetu.com" className="text-blood hover:underline ml-1">
                contact@raktsetu.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t dark:border-gray-800 mt-12 pt-8">
          <p className="text-center text-muted-foreground dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} RaktSetu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
