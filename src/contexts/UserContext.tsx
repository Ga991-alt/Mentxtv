//charan i changed some functions in this file 


// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { useEffect } from "react"; // if not already



// interface User {
//   name: string;
//   email: string;
//   phone?: string;
//   role: 'Student' | 'Mentor' | 'Admin';
//   image?: string;
//   id: string;
// }

// interface SocialMediaLinks {
//   instagram?: string;
//   twitter?: string;
//   youtube?: string;
// }

// interface BookedSession {
//   id: string;
//   title: string;
//   mentor: string;
//   date: string;
//   time: string;
//   duration: string;
//   subjects: string[];
//   price: number;
//   status: 'upcoming' | 'completed' | 'live';
//   paymentStatus: 'pending' | 'paid';
// }

// interface UserContextType {
//   user: User | null;
//   socialMediaLinks: SocialMediaLinks;
//   bookedSessions: BookedSession[];
//   login: (userData: User) => void;
//   logout: () => void;
//   updateUserImage: (image: string) => void;
//   updateSocialMediaLinks: (links: SocialMediaLinks) => void;
//   addBookedSession: (session: BookedSession) => void;
//   updateSessionPaymentStatus: (sessionId: string, status: 'pending' | 'paid') => void;
//   updateSessionStatus: (sessionId: string, status: 'upcoming' | 'completed' | 'live') => void;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [socialMediaLinks, setSocialMediaLinks] = useState<SocialMediaLinks>({});
//   const [bookedSessions, setBookedSessions] = useState<BookedSession[]>([]);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedSessions = localStorage.getItem("bookedSessions");

//     if (storedUser) setUser(JSON.parse(storedUser));
//     if (storedSessions) setBookedSessions(JSON.parse(storedSessions));
//   }, []);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   useEffect(() => {
//     localStorage.setItem("bookedSessions", JSON.stringify(bookedSessions));
//   }, [bookedSessions]);


//   const login = (userData: User) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//     setBookedSessions([]);
//   };

//   const updateUserImage = (image: string) => {
//     if (user) {
//       setUser({ ...user, image });
//     }
//   };

//   const updateSocialMediaLinks = (links: SocialMediaLinks) => {
//     setSocialMediaLinks(links);
//   };

//   const addBookedSession = (session: BookedSession) => {
//     setBookedSessions(prev => [...prev, session]);
//   };

//   const updateSessionPaymentStatus = (sessionId: string, status: 'pending' | 'paid') => {
//     setBookedSessions(prev => 
//       prev.map(session => 
//         session.id === sessionId 
//           ? { ...session, paymentStatus: status }
//           : session
//       )
//     );
//   };

//   const updateSessionStatus = (sessionId: string, status: 'upcoming' | 'completed' | 'live') => {
//     setBookedSessions(prev => 
//       prev.map(session => 
//         session.id === sessionId 
//           ? { ...session, status }
//           : session
//       )
//     );
//   };

//   return (
//     <UserContext.Provider value={{ 
//       user, 
//       socialMediaLinks, 
//       bookedSessions,
//       login, 
//       logout, 
//       updateUserImage, 
//       updateSocialMediaLinks,
//       addBookedSession,
//       updateSessionPaymentStatus,
//       updateSessionStatus
//     }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  phone?: string;
  role: 'Student' | 'Mentor' | 'Admin';
  image?: string;
  id: string;
}

interface SocialMediaLinks {
  instagram?: string;
  twitter?: string;
  youtube?: string;
}

interface BookedSession {
  id: string;
  title: string;
  mentor: string;
  date: string;
  time: string;
  duration: string;
  subjects: string[];
  price: number;
  status: 'upcoming' | 'completed' | 'live';
  paymentStatus: 'pending' | 'paid';
}

interface UserContextType {
  user: User | null;
  socialMediaLinks: SocialMediaLinks;
  bookedSessions: BookedSession[];
  loading: boolean; // Added loading state
  login: (userData: User) => void;
  logout: () => void;
  updateUserImage: (image: string) => void;
  updateSocialMediaLinks: (links: SocialMediaLinks) => void;
  addBookedSession: (session: BookedSession) => void;
  updateSessionPaymentStatus: (sessionId: string, status: 'pending' | 'paid') => void;
  updateSessionStatus: (sessionId: string, status: 'upcoming' | 'completed' | 'live') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [socialMediaLinks, setSocialMediaLinks] = useState<SocialMediaLinks>({});
  const [bookedSessions, setBookedSessions] = useState<BookedSession[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state

  // Initialize user and booked sessions from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedSessions = localStorage.getItem("bookedSessions");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedSessions) setBookedSessions(JSON.parse(storedSessions));

    setLoading(false); // Initialization complete
  }, []);

  // Persist user changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Persist booked sessions changes to localStorage
  useEffect(() => {
    localStorage.setItem("bookedSessions", JSON.stringify(bookedSessions));
  }, [bookedSessions]);

  // const login = (userData: User) => {
  //   setUser(userData);
  // };
  const login = (userData: User) => {
  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData)); // persist user
};

  const logout = () => {
    setUser(null);
    setBookedSessions([]);
  };

  const updateUserImage = (image: string) => {
    if (user) {
      setUser({ ...user, image });
    }
  };

  const updateSocialMediaLinks = (links: SocialMediaLinks) => {
    setSocialMediaLinks(links);
  };

  const addBookedSession = (session: BookedSession) => {
    setBookedSessions(prev => [...prev, session]);
  };

  const updateSessionPaymentStatus = (sessionId: string, status: 'pending' | 'paid') => {
    setBookedSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, paymentStatus: status }
          : session
      )
    );
  };

  const updateSessionStatus = (sessionId: string, status: 'upcoming' | 'completed' | 'live') => {
    setBookedSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, status }
          : session
      )
    );
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      socialMediaLinks, 
      bookedSessions,
      loading, // Provide loading state to consumers
      login, 
      logout, 
      updateUserImage, 
      updateSocialMediaLinks,
      addBookedSession,
      updateSessionPaymentStatus,
      updateSessionStatus
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
