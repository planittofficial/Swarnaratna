import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, Search, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartDrawer from './CartDrawer';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Gifts', href: '/gifts' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full relative top-0 z-[1000]">
      {/* Premium Top Announcement */}
      <div className="bg-[#1a2e1a] text-[#d4af37] py-2 px-3 sm:px-6 lg:px-8 text-[8px] sm:text-[10px] flex justify-center items-center font-black tracking-[0.18em] sm:tracking-[0.3em] uppercase border-b border-white/5 relative z-[101]">
        <Sparkles className="w-2.5 h-2.5 mr-2 sm:w-3 sm:h-3 sm:mr-3 animate-pulse shrink-0" />
        <p className="leading-tight text-center">Curating the World's Finest Dry Fruits - Complimentary Global Logistics</p>
      </div>

      <header 
        className={`fixed w-full top-0 left-0 z-[1000] transition-all duration-500 ${
          isScrolled 
          ? 'bg-white h-16 sm:h-20 shadow-xl border-b border-stone-100' 
          : 'bg-white h-20 sm:h-28 border-b border-stone-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0 group relative">
              <motion.div
                animate={{ scale: isScrolled ? 0.8 : 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img 
                  src="/Swarnaratna_Logo.jpeg" 
                  alt="Swarnaratna Logo" 
                  className="h-12 sm:h-24 w-auto object-contain transition-all duration-500 group-hover:scale-105"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-12 items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group py-2 ${
                    isActive(item.href) ? 'text-emerald-950' : 'text-stone-400 hover:text-emerald-950'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#d4af37] transition-all duration-500 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-6">
              {/* Search Toggle */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 sm:p-3 text-emerald-950 hover:bg-stone-50 rounded-full transition-all duration-300 hover:rotate-90"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Desktop User Section */}
              <div className="hidden lg:flex items-center border-l border-stone-100 pl-6">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <Link to="/profile" className="text-[10px] font-black text-emerald-950 uppercase tracking-[0.2em] hover:text-[#d4af37] transition-colors">
                      {user.name.split(' ')[0]}
                    </Link>
                    <button
                      onClick={logout}
                      className="p-2 text-stone-300 hover:text-red-500 transition-all duration-300"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 text-emerald-950 hover:text-[#d4af37] transition-all duration-300 group"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden xl:inline text-[10px] font-black uppercase tracking-[0.2em]">Registry</span>
                  </Link>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 sm:p-3 bg-emerald-950 text-[#d4af37] rounded-full transition-all duration-500 hover:scale-110 shadow-lg group"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d4af37] text-emerald-950 text-[8px] rounded-full w-4 h-4 flex items-center justify-center font-black">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 sm:p-3 text-emerald-950 hover:bg-stone-50 rounded-full transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar Dropdown */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute left-0 right-0 bg-white shadow-2xl border-b border-stone-100 pb-10 pt-4 px-4"
              >
                <div className="relative max-w-4xl mx-auto">
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search our collection..." 
                    className="w-full border-b-2 border-emerald-950/10 bg-transparent px-12 py-6 focus:outline-none focus:border-emerald-950 transition-all text-2xl font-light italic text-emerald-950"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        navigate(`/products?q=${e.target.value}`);
                        setIsSearchOpen(false);
                      }
                    }}
                  />
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[#d4af37] w-6 h-6" />
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-300 hover:text-emerald-950 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Navigation Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/95 backdrop-blur-md z-[1100] lg:hidden"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-[70%] sm:w-[60%] max-w-xs bg-[#102417] z-[1200] lg:hidden px-8 py-16 shadow-2xl border-l border-white/10 flex flex-col"
              >
                <div className="flex justify-between items-center mb-16">
                  <img src="/Swarnaratna_Logo.jpeg" className="h-12 w-auto object-contain" alt="Logo" />
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-[#d4af37] border border-[#d4af37]/20 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <nav className="flex-1 space-y-8">
                  {navigation.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block text-base font-bold uppercase tracking-[0.2em] transition-colors ${
                          isActive(item.href) ? 'text-[#d4af37]' : 'text-white/90 hover:text-[#d4af37]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="pt-10 border-t border-white/5 space-y-8">
                  {user ? (
                    <div className="flex flex-col space-y-4">
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-[#d4af37] font-black uppercase tracking-[0.2em] text-[10px]">Registry: {user.name}</Link>
                      <button onClick={logout} className="text-red-400 hover:text-red-500 font-black uppercase tracking-[0.2em] text-[10px] text-left">Sign Out</button>
                    </div>
                  ) : (
                    <Link 
                      to="/login" 
                      onClick={() => setIsMenuOpen(false)} 
                      className="flex items-center justify-center w-full bg-[#d4af37] text-emerald-950 py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-2xl"
                    >
                      Authenticate
                    </Link>
                  )}
                  <div className="flex justify-start space-x-6">
                    <Heart className="w-5 h-5 text-white/40" />
                    <User className="w-5 h-5 text-white/40" />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
      <div className={`h-20 sm:h-28 transition-all ${isScrolled ? 'h-16 sm:h-20' : ''}`} />
      
      {/* Global Components */}
      <CartDrawer />
    </div>
  );
};

export default Header;

