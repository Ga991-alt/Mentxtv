import { useNavigate } from "react-router-dom";

interface AdvertisementBannerProps {
  imageUrl?: string;
  redirectUrl?: string;
  altText?: string;
}

const AdvertisementBanner = ({ 
  imageUrl = "/assets/advertisement-banner.jpg", 
  redirectUrl = "/mentors",
  altText = "Advertisement Banner"
}: AdvertisementBannerProps) => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate(redirectUrl);
  };

  return (
    <div className="w-full mb-8">
      <div 
        className="relative w-full h-32 md:h-40 lg:h-48 cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        onClick={handleBannerClick}
      >
        <img 
          src={imageUrl} 
          alt={altText}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300" />
      </div>
    </div>
  );
};

export default AdvertisementBanner;