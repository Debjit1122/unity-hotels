// components/Footer.js

const Footer = () => {
    return (
        <footer className="bg-zinc-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-y-4 md:gap-y-0">
                    <div className="mb-4 md:mb-0">
                        <img src="/logo.png" alt="" className="size-[100px]" />
                        <p className="text-sm">Your Gateway to Comfort and Luxury</p>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <ul>
                            <li><a href="#" className="text-sm hover:text-gray-400">Home</a></li>
                            <li><a href="#" className="text-sm hover:text-gray-400">Rooms</a></li>
                            <li><a href="#" className="text-sm hover:text-gray-400">Services</a></li>
                            <li><a href="#" className="text-sm hover:text-gray-400">Contact</a></li>
                        </ul>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-2">Additional Links</h3>
                        <ul>
                            <li><a href="#" className="text-sm hover:text-gray-400">About Us</a></li>
                            <li><a href="#" className="text-sm hover:text-gray-400">Gallery</a></li>
                            <li><a href="#" className="text-sm hover:text-gray-400">Special Offers</a></li>
                        </ul>
                    </div>
                    <div className="text-center md:text-right">
                        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                        <p className="text-sm">123 Unity Street,</p>
                        <p className="text-sm">City, Country</p>
                        <p className="text-sm">Email: info@unityhotels.com</p>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-500 pt-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Unity Hotels. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
