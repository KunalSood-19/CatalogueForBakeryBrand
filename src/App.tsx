import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CakeSlice,
  Clock3,
  MessageCircle,
  Search,
  X,
  Filter,
  Leaf,
  Award,
  HeartHandshake,
  Mouse,
  ChevronDown,
  Upload,
  Loader2,
  Globe,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const WHATSAPP_NUMBER = '918872154000';

type Category = 'All' | 'Cakes' | 'Dry Cakes' | 'Sweet Treats & Delights' | 'Hampers';

type Product = {
  id: string;
  name: string;
  category: Exclude<Category, 'All'>;
  price: string;
  description: string;
  note: string;
  image: string;
  color: string;
  featured?: boolean;
};

const getProductImage = (name: string, category: string) => {
  const lower = name.toLowerCase();
  
  if (lower === 'brownies') return '/images/Assorted Brownie.jpeg';
  if (lower === 'brookies') return '/images/broikie.png';
  if (lower === 'choco nutella cookies') return '/images/Choco Nutella cookies.png';
  if (lower === 'granola bars') return '/images/GranolaBars.jpeg';
  if (lower === 'janmashtami cake') return '/images/Janmashtami cake.png';
  if (lower === 'rasmalai tres leches') return '/images/Rasmalai tresleche.png';
  if (lower === 'rasmalai cake') return '/images/rasmallaicake.png';
  if (lower.includes('semifondant')) return '/images/Semifondant cake with fresh fruits filling.jpeg';
  if (lower === 'butterscotch cake') return '/images/butterscotchcake.png';
  if (lower === 'cake with hidden gift') return '/images/cakewithhiddengift.png';
  if (lower === 'chocolate cake') return '/images/chocolateCake.png';
  if (lower === 'chocolate truffle cake') return '/images/chocolatetrufflecake.png';
  if (lower === 'cookies') return '/images/cookies.png';
  if (lower === 'customized cakes') return '/images/customizedcake.png';
  if (lower.includes('fruit cake')) return '/images/fruitcake.png';
  if (lower.includes('hampers')) return '/images/hamper.png';
  
  if (lower.includes('motichoor') || lower.includes('motichur')) return '/images/Motichur Rabri dry cake .png';
  if (lower.includes('rabdi malai') || lower.includes('rabri malai')) return '/images/rabrimalaicake.png';
  
  if (lower.includes('anti-gravity')) return '/images/antigravity cake with 2 tier..png';
  if (lower.includes('two-tier') || lower.includes('multi-tier')) return '/images/twotiercake.png';
  if (lower.includes('assorted chocolates')) return '/images/Assorted chocolates.png';
  
  if (lower === 'atta jaggery cake') return '/images/AttaJaggeryCake.png';
  if (lower === 'classic mawa cake') return '/images/ClassicMawaCake.png';
  if (lower === 'oats chocolate cake') return '/images/OatsChocolateCake.png';
  if (lower === 'pineapple flavoured cake') return '/images/PineappleFlavouredDryCake.png';
  if (lower === 'rava (suji) cake') return '/images/Rava SujiCake.png';
  if (lower === 'tutti frutti cake') return '/images/TuttiFruttiCake.png';
  if (lower === 'blueberry cake') return '/images/blueberrycake.png';
  if (lower === 'cupcakes') return '/images/cupcakes.png';
  if (lower === 'glass cakes') return '/images/glass cake in premium flavours .png';
  if (lower === 'lotus biscoff cake') return '/images/lotusBiscoff.png';
  if (lower === 'marble cake') return '/images/marblecake.png';
  if (lower === 'muffins') return '/images/muffins.png';
  if (lower === 'orange delight cake') return '/images/orangedelightdrycake.png';
  if (lower === 'pineapple cake') return '/images/pineapplecake.png';
  if (lower === 'plum cake') return '/images/plumdrycake.png';
  if (lower === 'rose berry delight cake') return '/images/roseberrycake.png';
  if (lower === 'strawberry cake') return '/images/strawberrycake.png';
  if (lower === 'chocolate mousse cake') return '/images/chocoatemousecake.png';
  if (lower === 'fondant cakes') return '/images/customizedcake.png';
  if (lower === 'gulab jamun cake') return '/images/gulabjamuncake.png';
  if (lower === 'mithai fusion cakes') return '/images/mithaifussion.png';
  if (lower === 'pan-flavoured cake') return '/images/pancake.png';
  if (lower === 'red velvet cream cheese cake') return '/images/redvelvet.png';
  if (lower === 'espresso tiramisu cake') return '/images/espressotiramisucake.jpeg';
  if (lower === 'persian dream cake') return '/images/persiandream.png';

  // Smart fallbacks for items without specific images:
  if (lower.includes('chocolate') || lower.includes('truffle') || lower.includes('choco') || lower.includes('brownie') || lower.includes('espresso') || lower.includes('plum')) {
    return '/images/chocolate-ganache-cake.png';
  }
  if (lower.includes('gulab jamun') || lower.includes('mithai') || lower.includes('motichoor') || lower.includes('saffron') || lower.includes('rasmalai')) {
    return '/images/saffron-macarons.png';
  }
  if (lower.includes('cookie') || lower.includes('glass cakes')) {
    return '/images/cookies2.png';
  }
  if (category === 'Dry Cakes' || lower.includes('loaf') || lower.includes('muffin')) {
    return '/images/cardamom-orange-loaf.png';
  }
  return '/images/pistachio-raspberry-cake.png'; 
};

const getProductDetails = (name: string): { description: string, note: string } => {
  const lower = name.toLowerCase();
  
  // Cakes
  if (lower.includes('pineapple cake')) return { description: 'A light and airy vanilla sponge soaked in sweet pineapple syrup, layered with freshly whipped cream, and generously studded with juicy, golden pineapple chunks. Finished with a delicate cream frosting and cherry garnishes.', note: 'A tropical delight perfect for any occasion.' };
  if (lower.includes('strawberry cake')) return { description: 'Tender vanilla sponge cake infused with natural strawberry extract, layered with a handmade fresh strawberry compote and rich mascarpone whipped cream. It offers a perfect balance of tart and sweet in every bite.', note: 'Sweet, light, and perfectly pink.' };
  if (lower.includes('blueberry cake')) return { description: 'A delightfully soft sponge cake layered with a vibrant, tangy wild blueberry preserve and smooth cream cheese frosting. The natural tartness of the berries perfectly complements the sweet, velvety layers.', note: 'A perfect balance of sweet and tart.' };
  if (lower.includes('butterscotch cake')) return { description: 'Moist caramel-infused sponge cake layered with rich butterscotch sauce and whipped cream. Packed with crunchy caramelized cashew pralines (nougat) for a satisfying textural contrast in every slice.', note: 'A timeless crowd favorite.' };
  if (lower.includes('fresh fruit cake')) return { description: 'A classic, fluffy vanilla sponge delicately soaked in fruit nectar, layered with light whipped cream, and abundantly topped with a colorful medley of seasonal fresh fruits like kiwi, apples, grapes, and berries.', note: 'Fresh, vibrant, and wholesome.' };
  if (lower.includes('rasmalai cake')) return { description: 'A brilliant fusion dessert featuring cardamom and saffron-infused sponge cake soaked in sweet thickened milk (ras). Layered with soft chunks of authentic rasmalai and frosted with pistachio-rose whipped cream.', note: 'The ultimate desi festive treat.' };
  if (lower.includes('chocolate mousse cake')) return { description: 'A sophisticated dessert featuring a rich, dense chocolate brownie base topped with a towering layer of airy, melt-in-your-mouth French chocolate mousse. Finished with a mirror cocoa glaze.', note: 'Light as a feather, rich in taste.' };
  if (lower.includes('chocolate truffle cake')) return { description: 'The ultimate indulgence for chocolate purists. Dense, dark chocolate sponge cake enveloped in multiple layers of thick, luxurious dark chocolate truffle ganache. Rich, slightly bitter, and deeply satisfying.', note: 'For the serious chocolate lover.' };
  if (lower.includes('chocolate cake')) return { description: 'Our signature classic bake. Intensely moist, cocoa-rich sponge cake layered with a smooth, sweet milk chocolate buttercream frosting. A nostalgic, comforting favorite that never disappoints.', note: 'Pure chocolate heaven.' };
  if (lower.includes('pan-flavoured cake')) return { description: 'An incredibly unique fusion cake that captures the essence of sweet meetha paan. Soft sponge infused with betel leaf extract, layered with gulkand (rose petal preserve), fennel, and sweetened coconut.', note: 'A beautifully fragrant, traditional twist.' };
  if (lower.includes('gulab jamun cake')) return { description: 'Cardamom-spiced vanilla sponge layered with sliced, syrupy gulab jamuns and a delicate rose-infused whipped cream. An innovative and deeply comforting marriage of a classic Indian sweet and a modern cake.', note: 'A sweet celebration of Indian flavors.' };
  if (lower.includes('mithai fusion')) return { description: 'An opulent centerpiece that brings together the best of Indian confections. A saffron-spiked cake layered with assorted premium mithai like kaju katli, barfi, and peda, beautifully decorated with edible silver leaf.', note: 'The best of both worlds.' };
  if (lower.includes('red velvet')) return { description: 'Classic vivid red velvet layers featuring a subtle buttermilk and cocoa flavor, perfectly balanced with a thick, tangy, and smooth cream cheese frosting. Garnished with red velvet cake crumbs.', note: 'Elegant and irresistible.' };
  if (lower.includes('tier') || lower.includes('anti-gravity')) return { description: 'A jaw-dropping, custom-engineered architectural marvel. Whether it’s a towering multi-tiered wedding cake or a physics-defying anti-gravity design, this show-stopping cake is built to amaze your guests.', note: 'Grandeur for your special day.' };
  if (lower.includes('fondant') || lower.includes('semifondant')) return { description: 'A highly customizable, visually stunning creation featuring intricate handcrafted sugar art, figurines, and elegant drapes made from premium fondant, covering our signature moist sponge layers.', note: 'Art you can eat.' };
  if (lower.includes('rabdi malai')) return { description: 'A royal dessert experience featuring a soft sponge heavily soaked in rich, slow-reduced sweetened milk (rabdi). Garnished generously with slivered almonds, pistachios, and dried rose petals.', note: 'Decadent and truly royal.' };
  if (lower.includes('customized')) return { description: 'A completely bespoke cake tailored entirely to your unique vision. From the flavor profile and sponge texture to the theme, colors, and toppers, every detail is custom-crafted for your special occasion.', note: 'Your imagination, baked to perfection.' };
  if (lower.includes('janmashtami')) return { description: 'A specially crafted festive cake celebrating the joy of Janmashtami. Designed with traditional motifs and infused with flavors of makhan, saffron, and dry fruits to honor the spirit of the festival.', note: 'Perfect for festive offerings.' };
  if (lower.includes('hidden gift')) return { description: 'A delightful surprise cake engineered with a hollow core designed to safely conceal a special gift inside (like a ring, money, or note) that is revealed when the recipient pulls the topper.', note: 'Make their day unforgettable.' };
  if (lower.includes('lotus biscoff')) return { description: 'A modern dessert sensation featuring a caramel-spiced sponge loaded with creamy, original Lotus Biscoff spread, topped with crunchy Biscoff biscuit crumbles and a luscious cookie butter drip.', note: 'A modern caramel classic.' };
  
  // Dry Cakes
  if (lower.includes('rava')) return { description: 'A rustic, comforting semolina (suji) cake baked to golden perfection. Naturally dense, slightly crumbly, and delicately flavored with cardamom and coconut. A staple for Indian tea-time.', note: 'A nostalgic tea-time favorite.' };
  if (lower.includes('atta jaggery')) return { description: 'A wholesome, guilt-free loaf baked entirely with whole wheat flour (atta) and sweetened naturally with unrefined jaggery. Earthy, rich, and packed with health benefits.', note: 'Healthy yet absolutely delicious.' };
  if (lower.includes('oats chocolate')) return { description: 'A hearty and nutrient-dense chocolate cake packed with the goodness of rolled oats. It offers a fudgy texture and rich cocoa flavor without the guilt of refined ingredients.', note: 'Indulgence you can feel good about.' };
  if (lower.includes('rose berry')) return { description: 'A fragrant, elegant dry cake delicately flavored with pure rose water and studded with tart dried berries. Its beautiful floral aroma makes it a standout premium bake.', note: 'Floral, sweet, and elegant.' };
  if (lower.includes('marble cake')) return { description: 'A visually striking retro classic. A beautiful, swirling combination of rich, dark chocolate batter and buttery vanilla sponge, ensuring you get the best of both worlds in every single slice.', note: 'The perfect pairing of two classics.' };
  if (lower.includes('tutti frutti')) return { description: 'A soft, buttery vanilla loaf heavily studded with colorful, candied papaya pieces (tutti frutti). A slice of pure childhood nostalgia that pairs wonderfully with hot milk or tea.', note: 'A slice of childhood nostalgia.' };
  if (lower.includes('pineapple flavoured')) return { description: 'A tender, moist dry cake infused with bright, tropical pineapple essence and tiny candied fruit bits. Light, fruity, and perfect for an afternoon snack.', note: 'Light, fruity, and perfect for snacking.' };
  if (lower.includes('classic mawa')) return { description: 'An incredibly rich, dense cake originating from Irani cafes. Made with traditional khoya (reduced milk solids) and butter, offering a deeply caramelized, melt-in-the-mouth texture.', note: 'A buttery, melt-in-the-mouth Indian classic.' };
  if (lower.includes('plum cake')) return { description: 'A dense, intensely flavorful cake packed with a variety of dry fruits and nuts that have been macerated for months. Spiced with cinnamon, nutmeg, and clove for a warm holiday feel.', note: 'A festive holiday tradition.' };
  if (lower.includes('orange delight')) return { description: 'A zesty, refreshing loaf cake made with freshly squeezed orange juice and grated orange zest. It delivers a bright, citrusy punch and a beautifully soft crumb.', note: 'Bright, citrusy, and uplifting.' };
  if (lower.includes('tres leches')) return { description: 'A luxurious Latin-American inspired dessert featuring a ridiculously light sponge cake soaked overnight in a sweet mixture of three different milks (condensed, evaporated, and whole milk).', note: 'Incredibly moist and luxurious.' };
  if (lower.includes('espresso tiramisu')) return { description: 'A sophisticated coffee-infused dry cake that mimics the bold flavors of a classic Italian tiramisu. Baked with premium espresso and dusted heavily with dark cocoa powder.', note: 'A sophisticated pick-me-up.' };
  if (lower.includes('persian dream')) return { description: 'An exotic, highly aromatic dry cake flavored with pure saffron strands, edible rose water, and loaded with toasted pistachios and almonds. An aromatic journey to the Middle East.', note: 'An aromatic journey to the Middle East.' };
  if (lower.includes('motichoor')) return { description: 'An innovative festive fusion bake that incorporates the rich, ghee-laden taste of traditional motichoor ladoos directly into a soft, cardamom-scented sponge cake.', note: 'A sweet Indian celebration.' };
  
  // Treats & Hampers
  if (lower.includes('brownies')) return { description: 'Gooey, dense, and intensely chocolatey squares baked to perfection. They feature a perfectly crinkly, paper-thin top crust giving way to a rich, fudgy, melt-in-your-mouth center.', note: 'The ultimate chocolate fix.' };
  if (lower.includes('brookies')) return { description: 'The ultimate hybrid treat: a brilliant layer of chewy, buttery chocolate chip cookie baked seamlessly on top of a rich, fudgy dark chocolate brownie. The best of both worlds in one bite.', note: 'Why choose when you can have both?' };
  if (lower.includes('muffins')) return { description: 'Soft, towering domed treats baked fresh daily. Available in assorted flavors, bursting with premium ingredients like chocolate chips, blueberries, or nuts for a perfect morning companion.', note: 'Your perfect morning companion.' };
  if (lower.includes('cupcakes')) return { description: 'Individual miniature cakes baked to remain incredibly soft and moist, topped with generous, picture-perfect swirls of our signature handmade buttercream frosting.', note: 'Bite-sized moments of joy.' };
  if (lower.includes('glass cakes')) return { description: 'Exquisite, layered desserts served in premium glass jars. Showcasing beautiful visible strata of moist sponge, rich fillings, crunch elements, and smooth frostings.', note: 'Elegant and perfectly portioned.' };
  if (lower.includes('cookies')) return { description: 'Generously sized, gourmet cookies baked fresh in small batches. Expertly crafted to have crisp, golden edges and thick, chewy, doughy centers packed with flavor.', note: 'Pairs beautifully with a warm drink.' };
  if (lower.includes('granola bars')) return { description: 'Wholesome, energy-packed bars made from toasted rolled oats, premium assorted nuts, seeds, and dried fruits, bound together with pure honey. No refined sugars.', note: 'A healthy, energizing snack on the go.' };
  if (lower.includes('chocolates')) return { description: 'A curated selection of handcrafted chocolates. Tempered to a perfect snap, featuring assorted rich fillings like caramel, roasted nuts, and fruit truffles.', note: 'The perfect little indulgence.' };
  if (lower.includes('hampers')) return { description: 'A beautifully packaged, custom-curated selection of our finest bakes, treats, and dry cakes. Arranged in premium baskets and boxes, tailored perfectly to your budget and occasion.', note: 'Birthdays, Anniversaries, Festivals & more.' };

  // Fallback
  return {
    description: 'Freshly baked creation using the finest premium ingredients.',
    note: 'Perfect for every celebration.'
  };
};

const products: Product[] = [
  ...[
    'Pineapple Cake', 'Strawberry Cake', 'Blueberry Cake', 'Butterscotch Cake', 'Fresh Fruit Cake',
    'Rasmalai Cake', 'Chocolate Cake', 'Chocolate Mousse Cake', 'Chocolate Truffle Cake',
    'Pan-Flavoured Cake', 'Gulab Jamun Cake', 'Mithai Fusion Cakes', 'Red Velvet Cream Cheese Cake',
    'Two-Tier, Three-Tier & Multi-Tier Cakes', 'Fondant Cakes', 'Semifondant Cake with Fresh Fruits Filling',
    'Rabdi Malai Cake', 'Customized Cakes',
    'Janmashtami Cake', 'Cake with Hidden Gift', 'Lotus Biscoff Cake', 'Anti-Gravity Cake with 2 Tier'
  ].map((name, i) => ({
    id: `cake-${i}`,
    name,
    category: 'Cakes' as Exclude<Category, 'All'>,
    price: 'From ₹800',
    ...getProductDetails(name),
    image: getProductImage(name, 'Cakes'),
    color: 'sage'
  })),
  ...[
    'Rava (Suji) Cake', 'Atta Jaggery Cake', 'Oats Chocolate Cake', 'Rose Berry Delight Cake',
    'Marble Cake', 'Tutti Frutti Cake', 'Pineapple Flavoured Cake', 'Classic Mawa Cake',
    'Plum Cake', 'Orange Delight Cake', 'Rabri Malai Cake', 'Rasmalai Tres Leches',
    'Motichoor Rabdi Cake', 'Espresso Tiramisu Cake', 'Persian Dream Cake'
  ].map((name, i) => ({
    id: `dry-${i}`,
    name,
    category: 'Dry Cakes' as Exclude<Category, 'All'>,
    price: 'From ₹450',
    ...getProductDetails(name),
    image: getProductImage(name, 'Dry Cakes'),
    color: 'apricot'
  })),
  ...[
    'Brownies', 'Brookies', 'Muffins', 'Cupcakes', 'Glass Cakes', 'Cookies', 'Granola Bars', 'Choco Nutella Cookies', 'Assorted Chocolates'
  ].map((name, i) => ({
    id: `treat-${i}`,
    name,
    category: 'Sweet Treats & Delights' as Exclude<Category, 'All'>,
    price: name === 'Granola Bars' ? 'From ₹150' : 'From ₹250',
    ...getProductDetails(name),
    image: getProductImage(name, 'Sweet Treats & Delights'),
    color: 'cocoa'
  })),
  ...[
    'Customized Hampers'
  ].map((name, i) => ({
    id: `hamper-${i}`,
    name,
    category: 'Hampers' as Exclude<Category, 'All'>,
    price: 'From ₹1,500',
    ...getProductDetails(name),
    image: getProductImage(name, 'Hampers'),
    color: 'lilac',
    featured: true
  }))
];

const categoryList: Exclude<Category, 'All'>[] = ['Cakes', 'Dry Cakes', 'Sweet Treats & Delights', 'Hampers'];

function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!failed ? (
        <img
          src={encodeURI(product.image)}
          alt={product.name}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
      ) : (
        <div className={`flex h-full w-full items-center justify-center bg-${product.color}`}>
          <CakeSlice className="h-16 w-16 text-foreground/30" strokeWidth={1} />
        </div>
      )}
    </div>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={17} className="-rotate-45" />;
}

function ProductDetail({ product, onClose, onSelect }: { product: Product; onClose: () => void; onSelect: (product: Product) => void }) {
  const currentIndex = products.findIndex((item) => item.id === product.id);
  const nextProduct = products[(currentIndex + 1) % products.length];
  const previousProduct = products[(currentIndex - 1 + products.length) % products.length];
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('1 kg');
  const [message, setMessage] = useState('');
  const [customizations, setCustomizations] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [referenceFile, setReferenceFile] = useState<File | null>(null);

  const [isSending, setIsSending] = useState(false);

  const handleWhatsAppSend = async () => {
    setIsSending(true);
    let uploadedImageUrl = '';
    
    if (referenceFile) {
      try {
        const formData = new FormData();
        formData.append('image', referenceFile);
        
        const response = await fetch('https://api.imgbb.com/1/upload?key=8634e2a633dd84a801bac76e95fbbc0c', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.success) {
          uploadedImageUrl = data.data.url;
        }
      } catch (err) {
        console.error("Failed to upload image", err);
      }
    }

    const formattedDate = date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Not specified';
    const text = `Hi Yashika! I would like to inquire about an order:

*--- CUSTOMER DETAILS ---*
- *Name:* ${customerName || 'Not specified'}
- *Phone:* ${customerPhone || 'Not specified'}
- *Location:* ${customerLocation || 'Not specified'}

*--- ORDER DETAILS ---*
- *Product:* ${product.name}
- *Date:* ${formattedDate}
- *Size:* ${weight}

*--- CUSTOMIZATIONS ---*
- *Message:* ${message || 'None'}
- *Requests:* ${customizations || 'None'}
- *Reference Image:* ${uploadedImageUrl ? uploadedImageUrl : (referenceFile ? 'Will share in chat' : 'None')}

Could you please confirm if this is possible and share the price? Thank you!`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setIsSending(false);
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[80] overflow-y-auto bg-background/95 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mx-auto min-h-full max-w-7xl px-5 py-6 sm:px-8 lg:px-12">
        <div className="flex flex-row items-center justify-between gap-4">
          <button onClick={onClose} className="flex shrink-0 items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft size={14} className="sm:size-[15px]" /> 
            <span className="hidden sm:inline">Back to catalog</span>
            <span className="sm:hidden">Back</span>
          </button>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="display-font text-xl sm:text-2xl italic text-foreground">cake for you</span>
            <span className="mono-font text-[8px] sm:text-[9px] uppercase tracking-[.18em] text-muted-foreground hidden sm:inline-block">by yashika</span>
          </div>
        </div>
        <div className="grid items-center gap-10 py-14 lg:grid-cols-[1fr_.85fr] lg:gap-20 lg:py-20">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="relative mx-auto aspect-[.9] w-full max-w-lg overflow-hidden rounded-[38px] bg-muted shadow-2xl shadow-foreground/10">
            <ProductImage product={product} className="h-full" />
            <div className="absolute bottom-5 left-5 rounded-full bg-background/85 px-4 py-2 backdrop-blur-sm shadow-xl">
              <span className="mono-font text-[9px] sm:text-[10px] uppercase tracking-[.2em] text-foreground/80 font-bold">Handcrafted with love</span>
            </div>
          </motion.div>
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .1 }} className="max-w-lg">
            <p className="mono-font text-[10px] font-bold uppercase tracking-[.25em] text-primary">{product.category} / detail</p>
            <h1 className="display-font mt-5 text-6xl leading-[.88] sm:text-8xl">{product.name}</h1>
            <p className="mt-6 text-lg leading-8 text-foreground/70">{product.description}</p>
            <p className="mt-5 border-l-2 border-accent pl-4 text-sm italic leading-6 text-muted-foreground">{product.note}</p>
            <div className="mt-9 border-t border-foreground/10 pt-5"></div>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
              >
                <MessageCircle size={19} /> Ask about this bake
              </button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-5 sm:p-7 rounded-3xl bg-card border border-foreground/5 shadow-xl shadow-foreground/5">
                <h3 className="font-bold text-lg mb-5 flex items-center gap-2 text-foreground"><MessageCircle size={18} className="text-primary" /> Order Inquiry</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">Your Name</label>
                      <input type="text" placeholder="e.g. John Doe" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full bg-background border border-foreground/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground/50" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">Phone Number</label>
                      <input type="tel" placeholder="+91 99999 99999" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} className="w-full bg-background border border-foreground/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground/50" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">Delivery Location / City</label>
                    <input type="text" placeholder="e.g. Model Town, Ludhiana" value={customerLocation} onChange={e => setCustomerLocation(e.target.value)} className="w-full bg-background border border-foreground/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">Date Required</label>
                      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-background border border-foreground/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">Weight / Size</label>
                      <select value={weight} onChange={e => setWeight(e.target.value)} className="w-full bg-background border border-foreground/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground appearance-none">
                        <option>500g (Half Kg)</option>
                        <option>1 kg</option>
                        <option>1.5 kg</option>
                        <option>2 kg</option>
                        <option>3+ kg</option>
                        <option>Box / Assorted</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">Message on Cake</label>
                    <input type="text" placeholder="e.g. Happy Birthday Rahul" value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-background border border-foreground/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground/50" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">Customizations / Notes</label>
                    <textarea placeholder="Any specific design requests, flavor changes, or eggless preference?" value={customizations} onChange={e => setCustomizations(e.target.value)} className="w-full bg-background border border-foreground/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none h-20 text-foreground placeholder:text-muted-foreground/50" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">Reference Image (Optional)</label>
                    <div className="relative overflow-hidden rounded-xl border border-dashed border-foreground/20 bg-background/50 hover:bg-foreground/5 transition-colors">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={e => setReferenceFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 z-10 h-full w-full opacity-0 cursor-pointer" 
                      />
                      <div className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-muted-foreground">
                        <Upload size={14} />
                        {referenceFile ? referenceFile.name : 'Upload a reference design from Google/Pinterest'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-3">
                    <button onClick={() => setShowForm(false)} className="px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-muted-foreground hover:bg-foreground/5 transition-colors">Cancel</button>
                    <button disabled={isSending} onClick={handleWhatsAppSend} className="flex-1 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100">
                      {isSending ? <Loader2 size={15} className="animate-spin" /> : <MessageCircle size={15} />}
                      {isSending ? 'Preparing...' : 'Send to WhatsApp'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            <div className="mt-12 flex items-center justify-between border-t border-foreground/10 pt-5">
              <button onClick={() => onSelect(previousProduct)} className="flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"><ArrowLeft size={15} /> Previous</button>
              <span className="mono-font text-[9px] uppercase tracking-[.2em] text-muted-foreground">{String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}</span>
              <button onClick={() => onSelect(nextProduct)} className="flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary">Next <ArrowRight size={15} /></button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const bannerVarieties = [
  { title: "Sweet Delights", subtitle: "Made with love", img: "/images/h1.png" },
  { title: "Birthday Specials", subtitle: "Unforgettable moments", img: "/images/h2.png" },
  { title: "Elegant Tiered Cakes", subtitle: "For grand occasions", img: "/images/h3.png" },
  { title: "Bespoke Creations", subtitle: "Tailored to your vision", img: "/images/h4.png" },
  { title: "Floral Fantasies", subtitle: "Beautifully adorned", img: "/images/h5.jpeg" },
  { title: "The Gifting Suite", subtitle: "The art of giving", img: "/images/h6.jpeg" },
  { title: "Classic Elegance", subtitle: "Timeless recipes", img: "/images/h7.jpeg" },
  { title: "Joyful Gatherings", subtitle: "For every milestone", img: "/images/h8.jpeg" },
  { title: "Intimate Occasions", subtitle: "Celebrate in style", img: "/images/h9.jpeg" },
  { title: "Chocolate Lovers", subtitle: "Rich and decadent", img: "/images/h10.jpeg" },
  { title: "Afternoon Delights", subtitle: "Perfect pairings", img: "/images/h11.jpeg" },
  { title: "Artisan Crafts", subtitle: "Handmade perfection", img: "/images/h12.jpeg" },
  { title: "Custom Hampers", subtitle: "Curated for you", img: "/images/h13.jpeg" }
];

function Header() {
  useEffect(() => {
    const addScript = () => {
      if (document.getElementById('google-translate-script')) return;
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,hi,pa', layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE },
          'google_translate_element'
        );
      };
    };
    addScript();
  }, []);
  const allImages = Array.from(new Set([
    ...bannerVarieties.map(b => b.img),
    ...products.map(p => p.image)
  ]));
  
  const mid = Math.ceil(allImages.length / 2);
  const row1 = allImages.slice(0, mid);
  const row2 = allImages.slice(mid);

  const scrollItems1 = [...row1, ...row1, ...row1, ...row1];
  const scrollItems2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <header className="relative w-full mb-8 sm:mb-16 pt-8 sm:pt-12 overflow-hidden border-b border-foreground/5 pb-8 sm:pb-12 bg-card/20">
      {/* Translation Widget */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] group drop-shadow-2xl w-[55px] h-[55px] cursor-pointer">
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-primary text-primary-foreground rounded-full transition-transform group-hover:scale-110 pointer-events-none">
          <Globe size={22} />
        </div>
        <div id="google_translate_element" className="absolute inset-0 z-10 opacity-0 overflow-hidden w-full h-full"></div>
      </div>
      {/* Edge Fades */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: 'linear-gradient(to right, hsl(var(--background)) 0%, transparent 15%, transparent 85%, hsl(var(--background)) 100%)' }} />
      
      {/* Center Brand Overlay */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
        <div className="relative w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] transition-transform hover:scale-105 pointer-events-auto cursor-default">
          <img src="/images/image-Photoroom%20(1).png" alt="Cake For You By Yashika" className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      <div className="flex flex-col gap-8 sm:gap-12">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {scrollItems1.map((img, idx) => (
            <div key={idx} className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-md mx-3 sm:mx-5 w-[150px] sm:w-[220px] h-[220px] sm:h-[300px] bg-card p-2 sm:p-3 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:z-10 ${idx % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[2deg]'}`}>
              <div className="relative w-full h-full overflow-hidden rounded-xl bg-background/50">
                <img src={encodeURI(img)} alt="Gallery" className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {scrollItems2.map((img, idx) => (
            <div key={idx} className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-md mx-3 sm:mx-5 w-[150px] sm:w-[220px] h-[220px] sm:h-[300px] bg-card p-2 sm:p-3 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:z-10 ${idx % 2 === 0 ? 'rotate-[3deg]' : 'rotate-[-2deg]'}`}>
              <div className="relative w-full h-full overflow-hidden rounded-xl bg-background/50">
                <img src={encodeURI(img)} alt="Gallery" className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-background py-8 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <span className="display-font text-2xl text-foreground">cake for you</span>
          <span className="text-xs text-muted-foreground mt-1">© {new Date().getFullYear()} All Rights Reserved.</span>
        </div>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
          <MessageCircle size={16} /> Contact Support
        </a>
      </div>
    </footer>
  );
}

function CatalogSection({ onSelect }: { onSelect: (product: Product) => void }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category>('All');
  const [showFilter, setShowFilter] = useState(false);

  const activeProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCat = categoryFilter === 'All' || product.category === categoryFilter;
      const query = search.toLowerCase().trim();
      const matchSearch = !query || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });
  }, [search, categoryFilter]);

  return (
    <section className="mx-auto max-w-[90rem] px-5 pt-2 pb-8 sm:px-8 sm:py-8 lg:px-12 min-h-screen">
      <div className="mb-8 sm:mb-16 flex flex-row items-center gap-3 sm:gap-6 justify-between w-full">
        <div className="relative flex-1 max-w-lg group z-20">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none transition-colors group-focus-within:text-primary">
            <Search size={16} className="text-muted-foreground sm:size-[18px]" />
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-full border border-foreground/10 bg-white py-3 sm:py-3.5 pl-10 sm:pl-12 pr-10 text-xs sm:text-sm text-foreground placeholder-muted-foreground shadow-md transition-all hover:border-foreground/30 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Search catalog..."
          />
          {search && (
            <button className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4" onClick={() => setSearch('')}>
              <X size={14} className="text-muted-foreground transition-colors hover:text-foreground sm:size-[16px]" />
            </button>
          )}
        </div>
        
        <div className="relative z-30 shrink-0">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 sm:gap-3 rounded-full border border-foreground/10 bg-white px-4 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-medium text-foreground shadow-md transition-all hover:bg-foreground/5 hover:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <Filter size={14} className={`sm:size-[16px] ${categoryFilter !== 'All' ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="hidden sm:inline">{categoryFilter === 'All' ? 'All Collections' : categoryFilter}</span>
            <span className="inline sm:hidden">{categoryFilter === 'All' ? 'Filter' : 'Filtered'}</span>
          </button>
          
          <AnimatePresence>
            {showFilter && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-foreground/10 bg-background/90 p-2 shadow-2xl backdrop-blur-xl"
              >
                <button 
                  className={`block w-full rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${categoryFilter === 'All' ? 'bg-foreground/5 text-foreground font-bold' : 'hover:bg-foreground/5 font-medium'}`}
                  onClick={() => { setCategoryFilter('All'); setShowFilter(false); }}
                >
                  All Collections
                </button>
                {categoryList.map((cat) => (
                  <button 
                    key={cat}
                    className={`block w-full rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${categoryFilter === cat ? 'bg-foreground/5 text-foreground font-bold' : 'hover:bg-foreground/5 font-medium'}`}
                    onClick={() => { setCategoryFilter(cat); setShowFilter(false); }}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {activeProducts.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted/50 mb-6">
            <Search size={32} className="text-muted-foreground" />
          </div>
          <h3 className="display-font text-4xl tracking-tight">No creations found</h3>
          <p className="mt-3 text-lg text-muted-foreground max-w-md">We couldn't find anything matching your criteria. Try adjusting your search or filters.</p>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-16 sm:gap-24">
          {categoryList.map(category => {
            const categoryProducts = activeProducts.filter(p => p.category === category);
            if (categoryProducts.length === 0) return null;
            return (
              <div key={category} className="flex flex-col relative">
                <div className="flex items-center gap-4 mb-8 sm:mb-12">
                  <h2 className="display-font text-4xl sm:text-6xl text-foreground drop-shadow-sm">{category}</h2>
                  <div className="h-[1px] flex-1 bg-foreground/15 mt-2 sm:mt-4" />
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-8 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryProducts.map((product, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.5, delay: index * 0.05, ease: "easeOut" }
                      }}
                      key={product.id}
                      className="h-full z-0 hover:z-10 relative"
                    >
                      <article
                        className="group cursor-pointer relative flex flex-col h-full rounded-2xl sm:rounded-[2rem] bg-white/90 backdrop-blur-sm p-2 sm:p-4 shadow-md border border-foreground/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(195,121,96,0.4)] hover:bg-white hover:border-primary/40"
                        onClick={() => onSelect(product)}
                        tabIndex={0}
                        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(product); }}
                      >
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:rounded-3xl bg-muted">
                        <ProductImage product={product} className="h-full w-full" />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        
                        <span className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-xl backdrop-blur-md transition-all duration-500 group-hover:opacity-100 group-hover:scale-110">
                          <ArrowUpRightIcon />
                        </span>
                        
                        <span className="absolute left-2 top-2 sm:left-4 sm:top-4 rounded-full bg-background/85 px-2 py-1 sm:px-3 sm:py-1.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-foreground shadow-sm backdrop-blur-md">
                          {product.category}
                        </span>
                      </div>
                      
                      <div className="flex flex-1 flex-col justify-between pt-4 sm:pt-6 px-1 sm:px-2">
                        <div>
                          <h3 className="display-font text-lg sm:text-3xl leading-[1.1] tracking-tight">{product.name}</h3>
                          <p className="mt-2 sm:mt-3 text-[10px] sm:text-sm leading-relaxed text-muted-foreground line-clamp-2">{product.description}</p>
                        </div>
                        
                      </div>
                      </article>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}


function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-foreground">
      {/* Global Botanical Texture */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.3] mix-blend-multiply pointer-events-none" 
        style={{ backgroundImage: "url('/images/global-bg.png')", backgroundSize: "500px" }}
      />
      <div className="relative z-10">
        <Header />
        
        {/* Scroll Indicator */}
        <div className="flex justify-center -mt-2 sm:-mt-4 mb-10 sm:mb-16 relative z-20 pointer-events-none">
          <div className="flex flex-col items-center animate-bounce text-muted-foreground/60 gap-1.5">
            <span className="mono-font text-[9px] uppercase tracking-[.25em] font-bold">Scroll to Explore</span>
            <div className="flex flex-col items-center gap-0.5 mt-1">
              <Mouse size={18} strokeWidth={1.5} />
              <ChevronDown size={14} strokeWidth={2} className="opacity-70" />
            </div>
          </div>
        </div>

        <main>
          <CatalogSection onSelect={setSelectedProduct} />
        </main>
        <Footer />
      </div>
      <AnimatePresence>
        {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} onSelect={setSelectedProduct} />}
      </AnimatePresence>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;