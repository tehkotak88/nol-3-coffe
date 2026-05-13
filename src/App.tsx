/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Clock, 
  Menu as MenuIcon, 
  X 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from './lib/utils';

interface MenuItem {
  name: string;
  price: string;
  description?: string;
  image: string;
  category: 'coffee' | 'non-coffee' | 'food' | 'signature';
}

const MENU_DATA: MenuItem[] = [
  // Signature / Spesial
  {
    name: 'Coffee Nol Tiga',
    price: '20k',
    description: 'Es kopi susu khas Nol Tiga dengan racikan gula aren premium.',
    image: '/menu/coffe nol 3.png',
    category: 'signature'
  },
  {
    name: 'Nasi Goreng Nol Tiga',
    price: '25k',
    description: 'Nasi goreng hijau spesial dengan telur mata sapi dan kerupuk.',
    image: '/menu/nasi goreng nol 3.png',
    category: 'signature'
  },
  {
    name: 'Coffee Pandan',
    price: '20k',
    description: 'Paduan unik kopi susu dengan aroma pandan segar.',
    image: '/menu/coffe pandan.png',
    category: 'signature'
  },
  {
    name: 'Kopi Susu Nol Tiga',
    price: '15k',
    description: 'Kopi susu murni klasik khas Nol Tiga yang otentik.',
    image: '/menu/kopi susu.png',
    category: 'signature'
  },
  
  // Coffee / Kopi
  {
    name: 'Americano',
    price: '18k',
    description: 'Espresso murni dengan air panas atau dingin.',
    image: '/menu/americano.png',
    category: 'coffee'
  },
  {
    name: 'Vietnam Drip',
    price: '18k',
    description: 'Kopi tetes tradisional dengan susu kental manis.',
    image: '/menu/vieatnam drip.png',
    category: 'coffee'
  },
  {
    name: 'Espresso Bon Bon',
    price: '15k',
    description: 'Double shot espresso dengan lapisan susu manis.',
    image: '/menu/espreso bon bon.png',
    category: 'coffee'
  },
  {
    name: 'Cafe Latte',
    price: '20k',
    description: 'Paduan espresso dan susu creamy yang pas.',
    image: '/menu/caffe latte.png',
    category: 'coffee'
  },
  {
    name: 'Coffee Hazelnut',
    price: '25k',
    description: 'Blanded coffee dengan rasa hazelnut yang premium.',
    image: '/menu/coffe hazelnut.png',
    category: 'coffee'
  },
  {
    name: 'Coffee Caramel',
    price: '25k',
    description: 'Kopi susu dengan siraman saus caramel yang manis.',
    image: '/menu/coffe caramel.png',
    category: 'coffee'
  },
  {
    name: 'Coffee Creamy',
    price: '20k',
    description: 'Kopi susu dengan tekstur yang sangat lembut.',
    image: '/menu/coffe cramy.png',
    category: 'coffee'
  },
  {
    name: 'Espresso',
    price: '10k',
    description: 'Satu shot kopi murni yang kuat dan bold.',
    image: '/menu/espreso.png',
    category: 'coffee'
  },

  // Non-Coffee / Non-Kopi
  {
    name: 'Chocolate',
    price: '20k',
    description: 'Minuman cokelat premium yang kental dan manis.',
    image: '/menu/chocolate.png',
    category: 'non-coffee'
  },
  {
    name: 'Choco Nut',
    price: '20k',
    description: 'Cokelat manis dengan sentuhan rasa kacang gurih.',
    image: '/menu/choco nut.png',
    category: 'non-coffee'
  },
  {
    name: 'Choco Caramel',
    price: '20k',
    description: 'Paduan sempurna cokelat dan karamel yang legit.',
    image: '/menu/choco caramel.png',
    category: 'non-coffee'
  },
  {
    name: 'Choco Nana',
    price: '20k',
    description: 'Minuman cokelat dengan aroma pisang yang unik.',
    image: '/menu/choco nana.png',
    category: 'non-coffee'
  },
  {
    name: 'Choco Mint',
    price: '20k',
    description: 'Kesegaran mint dalam balutan cokelat creamy.',
    image: '/menu/choco mint.png',
    category: 'non-coffee'
  },
  {
    name: 'Matcha Frosty',
    price: '20k',
    description: 'Matcha dingin dengan topping cream yang lembut.',
    image: '/menu/matcha frosty.png',
    category: 'non-coffee'
  },
  {
    name: 'Taro',
    price: '20k',
    description: 'Minuman rasa talas yang manis dan creamy.',
    image: '/menu/taro.png',
    category: 'non-coffee'
  },
  {
    name: 'Bublegum',
    price: '20k',
    description: 'Minuman rasa permen karet yang ceria.',
    image: '/menu/bubelgum.png',
    category: 'non-coffee'
  },
  {
    name: 'Red Velvet',
    price: '20k',
    description: 'Rasa red velvet yang mewah dan lembut di lidah.',
    image: '/menu/redvelved.png',
    category: 'non-coffee'
  },
  {
    name: 'Cookies Cream',
    price: '20k',
    description: 'Blanded cookies dan susu dengan topping biskuit.',
    image: '/menu/chokies cream.png',
    category: 'non-coffee'
  },
  {
    name: 'Lemon Tea',
    price: '20k',
    description: 'Teh lemon segar untuk pelepas dahaga.',
    image: '/menu/lemon tea.png',
    category: 'non-coffee'
  },
  {
    name: 'Lychee Tea',
    price: '20k',
    description: 'Teh leci segar dengan potongan buah asli.',
    image: '/menu/lychee tea.png',
    category: 'non-coffee'
  },
  {
    name: 'Thai Tea',
    price: '20k',
    description: 'Thai tea otentik yang manis dan creamy.',
    image: '/menu/thai tea.png',
    category: 'non-coffee'
  },
  {
    name: 'Green Tea',
    price: '20k',
    description: 'Teh hijau susu yang menenangkan.',
    image: '/menu/greentea.png',
    category: 'non-coffee'
  },
  {
    name: 'Strawberry Tea',
    price: '20k',
    description: 'Teh rasa stroberi dengan aroma yang harum.',
    image: '/menu/strowberry tea.png',
    category: 'non-coffee'
  },
  {
    name: 'Lychee Kult',
    price: '20k',
    description: 'Perpaduan rasa leci dan Yakult yang segar.',
    image: '/menu/lychee kult.png',
    category: 'non-coffee'
  },
  {
    name: 'Passion Fruit',
    price: '20k',
    description: 'Minuman markisa yang asam dan menyegarkan.',
    image: '/menu/passion fruit.png',
    category: 'non-coffee'
  },
  {
    name: 'Mojito Mint',
    price: '20k',
    description: 'Soda lemon dengan daun mint segar.',
    image: '/menu/mojito mint.png',
    category: 'non-coffee'
  },
  {
    name: 'Strawberry Lemonade',
    price: '20k',
    description: 'Campuran soda, lemon, dan stroberi yang segar.',
    image: '/menu/stroberry lemonade.png',
    category: 'non-coffee'
  },
  {
    name: 'Crimson Blue',
    price: '20k',
    description: 'Mocktail biru eksotis yang mempesona.',
    image: '/menu/Crimson Blue.png',
    category: 'non-coffee'
  },

  // Food / Camilan
  {
    name: 'Mie Goreng Jawa',
    price: '25k',
    description: 'Mie goreng bumbu tradisional dengan cita rasa khas.',
    image: '/menu/mie goreng jawa.png',
    category: 'food'
  },
  {
    name: 'Nasi Goreng Balacan',
    price: '25k',
    description: 'Nasi goreng bumbu terasi yang gurih dan pedas.',
    image: '/menu/nasi goreng balacan.png',
    category: 'food'
  },
  {
    name: 'Nasi Goreng Chicken Katsu',
    price: '30k',
    description: 'Nasi goreng lezat disajikan dengan ayam katsu krispi.',
    image: '/menu/nasi goreng chiken katsu.png',
    category: 'food'
  },
  {
    name: 'Ricebowl Chicken Teriyaki',
    price: '28k',
    description: 'Ricebowl ayam saus teriyaki yang manis gurih.',
    image: '/menu/ricebowl ciken teriyaki.png',
    category: 'food'
  },
  {
    name: 'Ricebowl Black Pepper Chicken',
    price: '27k',
    description: 'Ayam lada hitam dengan nasi hangat dan telur.',
    image: '/menu/rice bowl black paper chiken.png',
    category: 'food'
  },
  {
    name: 'Ricebowl Asam Manis',
    price: '28k',
    description: 'Ayam bumbu asam manis segar dalam mangkuk nasi.',
    image: '/menu/ricebowl asam manis.png',
    category: 'food'
  },
  {
    name: 'Ricebowl Spicy Green',
    price: '28k',
    description: 'Ricebowl ayam dengan sambal hijau pedas mantap.',
    image: '/menu/rice bowl spice green.png',
    category: 'food'
  },
  {
    name: 'Chicken Katsu Sauce Teriyaki',
    price: '35k',
    description: 'Ayam katsu renyah dengan siraman saus teriyaki.',
    image: '/menu/chiken katsu sauce teriyaki.png',
    category: 'food'
  },
  {
    name: 'Chicken Katsu Sauce Cheese',
    price: '35k',
    description: 'Ayam katsu dengan saus keju yang melimpah.',
    image: '/menu/chiken katsu sause chees.png',
    category: 'food'
  },
  {
    name: 'Spring Roll Vegetable',
    price: '18k',
    description: 'Lumpia sayur goreng yang renyah dan gurih.',
    image: '/menu/spring roll vegetable.png',
    category: 'food'
  },
  {
    name: 'Onion Rings',
    price: '15k',
    description: 'Bawang bombay goreng tepung yang krispi.',
    image: '/menu/union rings.png',
    category: 'food'
  },
  {
    name: 'Pop Tofu',
    price: '22k',
    description: 'Tahu goreng krispi seukuran satu gigitan.',
    image: '/menu/pop tofu.png',
    category: 'food'
  },
  {
    name: 'Crispy Mushroom',
    price: '15k',
    description: 'Jamur krispi goreng dengan bumbu gurih.',
    image: '/menu/krispiy mushroom.png',
    category: 'food'
  },
  {
    name: 'French Fries Bolognaise',
    price: '20k',
    description: 'Kentang goreng dengan siraman saus daging bolognaise.',
    image: '/menu/french fries blognise.png',
    category: 'food'
  },
  {
    name: 'Kentang Goreng',
    price: '15k',
    description: 'Camilan kentang goreng klasik yang disukai semua orang.',
    image: '/menu/kentang goreng.png',
    category: 'food'
  },
  {
    name: 'Mantao Kaya',
    price: '20k',
    description: 'Mantao goreng lembut dengan selai srikaya.',
    image: '/menu/mantao kaya.png',
    category: 'food'
  },
  {
    name: 'Mantao Coklat',
    price: '20k',
    description: 'Mantao goreng dengan isian cokelat yang lumer.',
    image: '/menu/mantau coklat.png',
    category: 'food'
  },
  {
    name: 'Ubi Goreng',
    price: '18k',
    description: 'Ubi manis goreng yang hangat dan tradisional.',
    image: '/menu/ubi goreng.png',
    category: 'food'
  },
  {
    name: 'Pisang Goreng Sambel',
    price: '15k',
    description: 'Pisang goreng unik disajikan dengan sambal pedas.',
    image: '/menu/pisang goreng sambel.png',
    category: 'food'
  },
  {
    name: 'Pisang Nugget Palm Sugar',
    price: '15k',
    description: 'Pisang nugget renyah dengan taburan gula semut.',
    image: '/menu/pisang nuget palm sugar.png',
    category: 'food'
  },
  {
    name: 'Pisang Nugget Coklat Keju',
    price: '20k',
    description: 'Pisang nugget dengan parutan cokelat dan keju melimpah.',
    image: '/menu/pisang nuget coklat keju.png',
    category: 'food'
  },
  {
    name: 'Popcorn',
    price: '20k',
    description: 'Camilan berondong jagung yang pas menemani waktu santai.',
    image: '/menu/popcorn.png',
    category: 'food'
  },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredMenu = activeCategory === 'all' 
    ? MENU_DATA 
    : MENU_DATA.filter(item => item.category === activeCategory);

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'signature', label: 'Spesial' },
    { id: 'coffee', label: 'Kopi' },
    { id: 'non-coffee', label: 'Non-Kopi' },
    { id: 'food', label: 'Camilan' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-accent selection:text-brand-dark relative overflow-x-hidden">
      {/* Texture Overlays */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-50 opacity-10" />
      
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-6 flex items-center justify-between",
        isScrolled ? "bg-brand-dark/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
      )}>
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-black text-brand-dark text-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,215,0,0.4)]">N</div>
          <span className="font-display font-bold text-xl tracking-tighter text-white">
            NOL3<span className="text-accent italic">COFFEE</span>
          </span>
        </a>
        
        <div className="hidden md:flex items-center gap-10">
          {[
            { id: 'home', label: 'Beranda' },
            { id: 'catalog', label: 'Katalog' },
            { id: 'about', label: 'Tentang' }
          ].map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`} 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-accent transition-all relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a 
            href="https://www.instagram.com/noltigacoffee/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative px-6 py-2"
          >
            <div className="absolute inset-0 bg-accent rounded-full group-hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,215,0,0.2)]" />
            <span className="relative z-10 text-brand-dark text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <Instagram size={14} /> IG kami
            </span>
          </a>
        </div>

        <button 
          className="md:hidden w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </nav>      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-brand-dark text-white flex flex-col justify-center gap-12 px-12 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {[
                { id: 'home', label: 'Beranda' },
                { id: 'catalog', label: 'Katalog' },
                { id: 'about', label: 'Tentang' }
              ].map((link, i) => (
                <motion.a 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  key={link.id} 
                  href={`#${link.id}`} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-6xl font-display font-bold tracking-tighter hover:text-accent transition-colors italic uppercase shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-dark/95 backdrop-blur-xl"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-4xl max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-hidden bg-brand-gray rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-30 w-10 h-10 md:w-12 md:h-12 bg-brand-dark/50 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-brand-dark transition-all duration-300"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto h-[300px] md:h-auto">
                  <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-gray to-transparent md:bg-gradient-to-r md:from-transparent md:to-brand-gray/20" />
                </div>
                
                <div className="p-8 md:p-16 flex flex-col justify-center">
                  <div className="mb-6 md:mb-10">
                    <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-8">
                      {selectedItem.category}
                    </span>
                    <h3 className="text-4xl md:text-7xl font-display font-bold text-white tracking-tighter uppercase italic leading-none mb-4 md:mb-6">
                      {selectedItem.name}
                    </h3>
                    <p className="text-white/40 text-base md:text-xl font-light leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="flex items-center mt-4 md:mt-8 pt-6 md:pt-10 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Harga</span>
                      <span className="text-white text-4xl md:text-5xl font-display font-bold italic tracking-tighter">{selectedItem.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Modern Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="w-full h-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=2000" 
                alt="Background" 
                className="w-full h-full object-cover opacity-30 grayscale brightness-50"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark" />
          </div>
          
          <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-10 shadow-lg">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-accent text-[9px] uppercase font-black tracking-[0.4em]">Makassar Pride • Est. 2023</span>
              </div>
              
              <h1 className="text-white text-7xl md:text-[10rem] font-display font-bold leading-[0.85] tracking-tighter mb-12">
                NOL3<span className="text-accent underline underline-offset-[20px] decoration-4 italic">COFFEE</span>
              </h1>
              
              <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-16">
                Tempat singgah sederhana di jantung Makassar. Kopi pilihan untuk cerita yang tak terlupakan.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-8">
                <a 
                  href="#catalog" 
                  className="px-14 py-6 bg-accent text-brand-dark rounded-full font-black uppercase tracking-[0.2em] text-[11px] hover:scale-105 hover:shadow-[0_0_50px_rgba(255,215,0,0.4)] transition-all flex items-center gap-3"
                >
                  Lihat Menu <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-accent/50"
          >
            <ChevronRight className="rotate-90" size={40} />
          </motion.div>
        </section>

        {/* Scrolling Ticker */}
        <div className="py-12 bg-accent overflow-hidden border-y-4 border-brand-dark relative z-20 -rotate-1 scale-[1.02]">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex items-center gap-20 whitespace-nowrap"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-brand-dark text-4xl md:text-6xl font-display font-black uppercase tracking-tighter italic">
                NOL3 COFFEE <span className="text-white/40">•</span> BREWED TO PERFECTION <span className="text-white/40">•</span> MAKASSAR LOCAL PRIDE 100%
              </span>
            ))}
          </motion.div>
        </div>

        {/* Catalog Section */}
        <section id="catalog" className="py-40 px-6 bg-brand-dark relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-28">
              <div className="max-w-xl">
                <span className="text-accent font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Katalog Kami</span>
                <h2 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter uppercase italic leading-none">
                  THE <span className="text-accent underline decoration-brand-gray group-hover:decoration-accent transition-all duration-500">MENU</span>
                </h2>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                      activeCategory === cat.id 
                        ? "bg-accent text-brand-dark shadow-[0_15px_30px_rgba(255,215,0,0.2)] scale-105" 
                        : "bg-brand-gray text-white/40 border border-white/5 hover:border-accent/30"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
            >
              <AnimatePresence mode='popLayout'>
                {filteredMenu.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-brand-gray border border-white/5 group-hover:border-accent/40 transition-all duration-700 shadow-2xl">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />
                      
                      <div className="absolute inset-x-0 bottom-0 p-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="mb-4">
                           <span className="text-[10px] font-black uppercase tracking-widest text-accent mb-2 block">{item.category}</span>
                           <h3 className="text-3xl font-display font-bold text-white tracking-tighter leading-tight">{item.name}</h3>
                        </div>
                        <p className="text-white/40 text-xs font-serif italic mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                           <span className="text-white text-2xl font-display font-bold italic tracking-tighter">{item.price}</span>
                           <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-brand-dark -rotate-45 group-hover:rotate-0 transition-transform">
                              <ChevronRight size={20} />
                           </div>
                        </div>
                      </div>
                      
                      {item.category === 'signature' && (
                        <div className="absolute top-8 left-8 bg-accent/90 backdrop-blur text-brand-dark px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
                          Specialty
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* atmosphere / about */}
        <section id="about" className="py-40 bg-brand-gray relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative">
                <div className="absolute -inset-10 bg-accent/5 rounded-full blur-[100px]" />
                <motion.div 
                   initial={{ rotate: -5 }}
                   whileInView={{ rotate: 0 }}
                   className="relative aspect-square rounded-[4rem] overflow-hidden border-8 border-brand-dark/20 shadow-2xl"
                >
                  <img src="https://images.unsplash.com/photo-1497933321110-3844f23b7b4d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Ambience" />
                </motion.div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent rounded-full p-8 flex flex-col justify-center items-center text-center rotate-12 animate-float">
                   <p className="text-brand-dark font-display font-black text-4xl leading-none">10/10</p>
                   <p className="text-brand-dark/60 text-[9px] font-bold uppercase tracking-widest mt-2">Vibe Level</p>
                </div>
              </div>
              
              <div>
                <span className="text-accent font-black uppercase tracking-[0.6em] text-[10px] mb-8 block">Tentang Kami</span>
                <h2 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter mb-12 uppercase italic leading-none">
                  NOL3 <span className="text-accent underline decoration-white/10 italic">LOKAL</span>.
                </h2>
                <p className="text-white/50 text-xl font-light leading-relaxed mb-12">
                  Terletak di jantung Makassar, Warkop Nol3 adalah rumah kedua bagi siapa saja. Dari obrolan santai hingga inspirasi besar, kami sediakan seduhan terbaik untukmu.
                </p>
                
                <div className="space-y-4 mb-16">
                  <div className="flex items-center gap-6 p-8 bg-brand-dark/50 rounded-3xl border border-white/5">
                    <Clock className="text-accent shrink-0" size={32} />
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-white/30 mb-1">Jam Buka</p>
                      <p className="text-white font-bold text-lg">Buka Setiap Hari 24 Jam</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-8 bg-brand-dark/50 rounded-3xl border border-white/5">
                    <MapPin className="text-accent shrink-0" size={32} />
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-white/30 mb-1">Lokasi</p>
                      <p className="text-white font-bold text-lg">Jl. Anggrek Raya No.22, Paropo, Kec. Panakkukang, Kota Makassar, Sulawesi Selatan 90231</p>
                    </div>
                  </div>
                </div>

                <a 
                  href="https://www.instagram.com/noltigacoffee/" 
                  target="_blank"
                  className="inline-flex items-center gap-6 px-10 py-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-accent hover:text-brand-dark transition-all duration-500 group"
                >
                  <Instagram className="group-hover:scale-125 transition-transform" />
                  <span className="font-display font-bold text-2xl tracking-tighter uppercase italic">@noltigacoffee</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-brand-dark py-32 px-6 border-t border-white/5 relative overflow-hidden mt-auto">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -mr-64 -mt-64" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-white">
          <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-20 mb-32">
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-4 mb-10 group">
                <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center font-black text-brand-dark text-2xl group-hover:rotate-12 transition-transform">N</div>
                <span className="font-display font-bold text-3xl tracking-tighter text-white uppercase italic">Nol3<span className="text-accent">Coffee</span></span>
              </a>
              <p className="text-white/40 text-xl max-w-md font-light leading-relaxed mb-10">
                Menyajikan lebih dari sekadar kopi. Kami menyajikan ruang untuk berkarya, bercerita, dan berbagi rasa. Sampai jumpa di warung!
              </p>
              <div className="flex gap-6">
                {[Instagram, MapPin, Phone].map((Icon, i) => (
                   <a key={i} href="#" className="w-14 h-14 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300">
                      <Icon size={24} />
                   </a>
                ))}
              </div>
            </div>
            
            <div>
               <h4 className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-10">Tautan Cepat</h4>
               <ul className="space-y-6">
                  {[
                    { id: 'home', label: 'Beranda' },
                    { id: 'catalog', label: 'Katalog' },
                    { id: 'about', label: 'Tentang' }
                  ].map(link => (
                    <li key={link.id}>
                      <a href={`#${link.id}`} className="text-white/60 hover:text-white text-lg font-bold transition-colors flex items-center gap-3 group">
                        <span className="w-0 group-hover:w-4 h-0.5 bg-accent transition-all duration-300" />
                        {link.label}
                      </a>
                    </li>
                  ))}
               </ul>
            </div>
            
            <div>
               <h4 className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-10">Berlangganan</h4>
               <p className="text-white/40 text-sm mb-8">Berlangganan info promo dan event terbaru dari kami.</p>
               <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Email kamu..." 
                    className="w-full bg-brand-gray border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-accent/50 transition-all text-xs"
                  />
                  <button className="absolute right-2 top-2 bottom-2 px-6 bg-accent text-brand-dark rounded-xl font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-transform">
                    GAS!
                  </button>
               </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/20 text-[10px] font-mono">© 2024 WARKOP NOL3 MAKASSAR. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-10 text-white/20 text-[10px] font-mono uppercase tracking-[0.2em]">
               <a href="#" className="hover:text-accent">Terms</a>
               <a href="#" className="hover:text-accent">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

