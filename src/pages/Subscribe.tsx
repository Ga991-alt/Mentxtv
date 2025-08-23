// import { Check, X } from "lucide-react";

// export default function SubscribePage() {
//   const plans = [
//     {
//       id: 1,
//       title: "1 Month",
//       price: "$59",
//       color: "bg-blue-500",
//       features: [
//         { text: "One-to-One Mentor Session", available: true },
//         { text: "Personal Examination", available: true },
//         { text: "Community Access", available: true },
//         { text: "Progress Tracking", available: false },
//       ],
//     },
//     {
//       id: 2,
//       title: "3 Months",
//       price: "$149",
//       color: "bg-yellow-500",
//       features: [
//         { text: "One-to-One Mentor Session", available: true },
//         { text: "Personal Examination", available: true },
//         { text: "Community Access", available: true },
//         { text: "Progress Tracking", available: true },
//       ],
//     },
//     {
//       id: 3,
//       title: "6 Months",
//       price: "$249",
//       color: "bg-green-500",
//       features: [
//         { text: "One-to-One Mentor Session", available: true },
//         { text: "Personal Examination", available: true },
//         { text: "Community Access", available: true },
//         { text: "Progress Tracking", available: true },
//       ],
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 gap-8">
//       <h1 className="text-3xl font-bold text-gray-800 my-8">
//         Choose Your Subscription Plan
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full ">
//         {plans.map((plan) => (
//           <div
//             key={plan.id}
//             className="bg-white rounded-2xl shadow-lg px-6 pb-6 flex flex-col items-center hover:scale-105 transition"
//           >
//             {/* Header */}
//             <div
//               className={`${plan.color} text-white rounded-xl rounded-t-none  text-center py-4 mb-4 w-2/3`}
//             >
//               <h2 className="text-xl font-semibold mt-4">{plan.title}</h2>
//             </div>

//             {/* Price */}
//             <p className="text-3xl font-bold text-gray-800 mb-6">{plan.price}</p>

//             {/* Features */}
//             <ul className="space-y-3 w-full">
//               {plan.features.map((f, i) => (
//                 <li
//                   key={i}
//                   className={`flex items-center gap-2 text-sm font-medium ${
//                     f.available ? "text-gray-700" : "text-gray-400 line-through"
//                   }`}
//                 >
//                   {f.available ? (
//                     <Check className="w-4 h-4 text-green-500" />
//                   ) : (
//                     <X className="w-4 h-4 text-red-500" />
//                   )}
//                   {f.text}
//                 </li>
//               ))}
//             </ul>

//             {/* Button */}
//             <button
//               className={`${plan.color} text-white mt-6 px-6 py-2 rounded-full font-medium hover:opacity-90`}
//             >
//               Subscribe Now
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { Check, X } from "lucide-react";
import { useParams } from "react-router-dom";

export default function SubscribePage() {
  const { mentorId } = useParams<{ mentorId: string }>();

  const plans = [
    {
      id: 1,
      title: "1 Month",
      price: "$59",
      color: "bg-blue-500",
      features: [
        { text: "One-to-One Mentor Session", available: true },
        { text: "Personal Examination", available: true },
        { text: "Community Access", available: true },
        { text: "Progress Tracking", available: false },
      ],
    },
    {
      id: 2,
      title: "3 Months",
      price: "$149",
      color: "bg-yellow-500",
      features: [
        { text: "One-to-One Mentor Session", available: true },
        { text: "Personal Examination", available: true },
        { text: "Community Access", available: true },
        { text: "Progress Tracking", available: true },
      ],
    },
    {
      id: 3,
      title: "6 Months",
      price: "$249",
      color: "bg-green-500",
      features: [
        { text: "One-to-One Mentor Session", available: true },
        { text: "Personal Examination", available: true },
        { text: "Community Access", available: true },
        { text: "Progress Tracking", available: true },
      ],
    },
  ];

  const handleSubscribe = (planId: number) => {
    // For now just log, you can call your backend here
    console.log(`Subscribing to plan ${planId} for mentor ${mentorId}`);
    // Example: navigate(`/checkout/${mentorId}?plan=${planId}`)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 gap-8">
      <h1 className="text-3xl font-bold text-gray-800 my-8">
        Choose Your Subscription Plan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl shadow-lg px-6 pb-6 flex flex-col items-center hover:scale-105 transition"
          >
            {/* Header */}
            <div
              className={`${plan.color} text-white rounded-xl rounded-t-none text-center py-4 mb-4 w-2/3`}
            >
              <h2 className="text-xl font-semibold mt-4">{plan.title}</h2>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-gray-800 mb-6">{plan.price}</p>

            {/* Features */}
            <ul className="space-y-3 w-full">
              {plan.features.map((f, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    f.available ? "text-gray-700" : "text-gray-400 line-through"
                  }`}
                >
                  {f.available ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  {f.text}
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              onClick={() => handleSubscribe(plan.id)}
              className={`${plan.color} text-white mt-6 px-6 py-2 rounded-full font-medium hover:opacity-90`}
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
