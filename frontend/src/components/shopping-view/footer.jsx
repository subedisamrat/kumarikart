// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   Mail,
//   Phone,
//   MapPin,
//   ShoppingCart,
//   Home,
//   Info,
//   ArrowUp,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// const Footer = () => {
//   const [showScrollTop, setShowScrollTop] = useState(false); //text-rose-500

//   // Show button when scrolled down
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 300);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Scroll to top on click
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <footer className="relative bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-100 text-slate-800 border-t border-slate-300 shadow-inner">
//       <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
//         {/* Brand & About */}
//         <div className="md:col-span-1">
//           <h2 className="text-2xl font-bold  text-black">KumariKart</h2>
//           <p className="mt-4 text-sm text-slate-600">
//             Preserving culture, spreading blessings. Your one-stop shop for
//             authentic Nepali products with the divine Kumari touch.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <Link
//                 to="/"
//                 className="hover:text-rose-500 flex items-center gap-2"
//               >
//                 <Home size={16} /> Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/shop/listing"
//                 className="hover:text-rose-500 flex items-center gap-2"
//               >
//                 <ShoppingCart size={16} /> Shop
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/about"
//                 className="hover:text-rose-500 flex items-center gap-2"
//               >
//                 <Info size={16} /> About Us
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/contact"
//                 className="hover:text-rose-500 flex items-center gap-2"
//               >
//                 <Mail size={16} /> Contact
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Contact</h3>
//           <ul className="space-y-2 text-sm text-slate-600">
//             <li className="flex items-center gap-2">
//               <MapPin size={16} /> Kathmandu, Nepal
//             </li>
//             <li className="flex items-center gap-2">
//               <Phone size={16} /> +977-9800000000
//             </li>
//             <li className="flex items-center gap-2">
//               <Mail size={16} /> info@kumarikart.com
//             </li>
//           </ul>
//         </div>

//         {/* Partners / Business Section */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">For Partners</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <Link
//                 to="/become-seller"
//                 className="hover:text-rose-500 flex items-center gap-2"
//               >
//                 🚀 Become a Seller
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/advertise"
//                 className="hover:text-rose-500 flex items-center gap-2"
//               >
//                 📢 Advertise with Us
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/partner"
//                 className="hover:text-rose-500 flex items-center gap-2"
//               >
//                 🤝 Partner With Us
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/affiliate"
//                 className="hover:text-rose-500 flex items-center gap-2"
//               >
//                 🎯 Join Affiliate Program
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/gift-cards"
//                 className="hover:text-rose-500 flex items-center gap-2"
//               >
//                 🎁 Gift Cards (Coming Soon)
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Newsletter */}
//         <div className="md:col-span-2">
//           <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
//           <p className="text-sm text-slate-600 mb-4">
//             Get the latest cultural products, offers, and blessings directly to
//             your inbox.
//           </p>
//           <form
//             onSubmit={(e) => e.preventDefault()}
//             className="flex flex-col sm:flex-row gap-3"
//           >
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-md transition"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Bottom Footer Bar */}
//       <div className="bg-slate-200 text-sm text-center py-4 text-slate-500">
//         © {new Date().getFullYear()}{" "}
//         <span className="font-semibold text-rose-500">KumariKart</span>. All
//         rights reserved.
//       </div>

//       {/* Scroll to Top Button */}
//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-6 right-6 bg-rose-500 text-white p-2 rounded-full shadow-lg hover:bg-rose-600 transition"
//           aria-label="Scroll to top"
//         >
//           <ArrowUp size={20} />
//         </button>
//       )}
//     </footer>
//   );
// };

// export default Footer;

import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  Home,
  Info,
  ArrowUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkClass =
    "hover:text-rose-500 transition-colors duration-300 relative group";

  const underlineClass =
    "absolute left-0 bottom-0 h-0.5 w-0 bg-rose-500 transition-all duration-300 group-hover:w-full";

  return (
    <footer className="relative bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-100 text-slate-800 border-t border-slate-300 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-rose-500">KumariKart</h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            Preserving culture, spreading blessings. Your one-stop shop for
            authentic Nepali products with the divine Kumari touch.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li className={linkClass}>
              <Link to="/" className="flex items-center gap-2">
                <Home size={16} /> Home
              </Link>
              <span className={underlineClass}></span>
            </li>
            <li className={linkClass}>
              <Link to="/shop/listing" className="flex items-center gap-2">
                <ShoppingCart size={16} /> Shop
              </Link>
              <span className={underlineClass}></span>
            </li>
            <li className={linkClass}>
              <Link to="/about" className="flex items-center gap-2">
                <Info size={16} /> About Us
              </Link>
              <span className={underlineClass}></span>
            </li>
            <li className={linkClass}>
              <Link to="/contact" className="flex items-center gap-2">
                <Mail size={16} /> Contact
              </Link>
              <span className={underlineClass}></span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Kathmandu, Nepal
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +977-9812345678
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@kumarikart.com
            </li>
          </ul>

          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-500 transition"
            >
              <Facebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-500 transition"
            >
              <Instagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-500 transition"
            >
              <Twitter />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Get cultural product drops, blessings, and exclusive offers in your
            inbox.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const email = e.target.email.value;
              try {
                const res = await fetch(
                  `${import.meta.env.VITE_API_URL}/api/newsletter/subscribe`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                  },
                );
                const data = await res.json();
                alert(data.message);
                e.target.reset();
              } catch (err) {
                alert("Subscription failed");
              }
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* For Partners */}
        <div>
          <h3 className="text-lg font-semibold mb-4">For Partners</h3>
          <ul className="space-y-3 text-sm">
            <li className={linkClass}>
              <Link to="/become-seller" className="flex items-center gap-2">
                🚀 Become a Seller
              </Link>
              <span className={underlineClass}></span>
            </li>
            <li className={linkClass}>
              <Link to="/advertise" className="flex items-center gap-2">
                📢 Advertise with Us
              </Link>
              <span className={underlineClass}></span>
            </li>
            <li className={linkClass}>
              <Link to="/partner" className="flex items-center gap-2">
                🤝 Partner with Us
              </Link>
              <span className={underlineClass}></span>
            </li>
            <li className={linkClass}>
              <Link to="/affiliate" className="flex items-center gap-2">
                🎯 Affiliate Program
              </Link>
              <span className={underlineClass}></span>
            </li>
            <li className={linkClass}>
              <Link to="/gift-cards" className="flex items-center gap-2">
                🎁 Gift Cards (Soon)
              </Link>
              <span className={underlineClass}></span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-slate-200 text-sm text-center py-4 text-slate-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-rose-500">KumariKart</span>. All
        rights reserved.
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-rose-500 text-white p-2 rounded-full shadow-lg hover:bg-rose-600 transition"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
