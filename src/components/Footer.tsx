
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link 
              to="/"
              className="text-2xl font-bold text-blood tracking-tight flex items-center"
            >
              <span className="mr-1">Rakt</span>
              <span className="text-foreground">Setu</span>
            </Link>
            <p className="text-muted-foreground">
              Bridging the gap between blood donors and recipients, one donation at a time.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-blood transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-blood transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-blood transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-blood transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/find-donor" className="text-muted-foreground hover:text-blood transition-colors">
                  Find a Donor
                </Link>
              </li>
              <li>
                <Link to="/become-donor" className="text-muted-foreground hover:text-blood transition-colors">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-blood transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-blood transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-blood transition-colors">
                  Blood Donation FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-blood transition-colors">
                  Donor Eligibility
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-blood transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-blood transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin size={20} className="mr-2 flex-shrink-0 text-blood" />
                <span className="text-muted-foreground">
                  123 Blood Bank Street, Medical District, City, Country
                </span>
              </li>
              <li className="flex">
                <Phone size={20} className="mr-2 flex-shrink-0 text-blood" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-blood transition-colors">
                  +123 456 7890
                </a>
              </li>
              <li className="flex">
                <Mail size={20} className="mr-2 flex-shrink-0 text-blood" />
                <a href="mailto:contact@raktsetu.com" className="text-muted-foreground hover:text-blood transition-colors">
                  contact@raktsetu.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} RaktSetu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
