import { useNavigate } from "react-router-dom";

interface AdvertisementBannerProps {
  imageUrl?: string;
  redirectUrl?: string;
  altText?: string;
}

const AdvertisementBanner = ({ 
  imageUrl = "/asserts/mentorship-banner.jpg", 
  redirectUrl = "/mentors",
  altText = "Advertisement Banner"
}: AdvertisementBannerProps) => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate(redirectUrl);
  };

  return (
    <div className="w-full mb-5 px-4 sm:px-6 lg:px-8">
      <div 
        className="relative w-full cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        onClick={handleBannerClick}
      >
        <img 
          src={imageUrl} 
          alt={altText}
          className="w-full h-auto object-contain rounded-xl"
        />
      </div>
    </div>
  );
};

export default AdvertisementBanner;
