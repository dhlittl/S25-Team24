"use client";
import { useEffect, useState } from "react";

export default function SponsorsPage() {
    const [sponsors, setSponsors] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // Simulates fetching from a backend (Replace this later with real database call)
    useEffect(() => {
      // Simulate a fetch call (you'll replace this later with a real API/database)
      const fetchSponsors = async () => {
  
  
        // Placeholder sample data (delete later when fetching real data)
        const placeholderData = [
          {
            id: 1,
            name: "SafeDrivers Inc",
            description: "Description for SafeDrivers Inc",
            items: "Item 1, Item 2, Item 3...",
          },
          {
            id: 2,
            name: "SponsorNum2",
            description: "Description for SponsorNum2",
            items: "Item 1, Item 2, Item 3...",
          },
        ];
  
        setSponsors(placeholderData);
        setLoading(false);
      };
  
      fetchSponsors();
    }, []);
  
    return (
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Our Sponsors</h2>
  
        {loading ? (
          <p className="text-gray-500">Loading sponsors...</p>
        ) : sponsors.length === 0 ? (
          <p className="text-gray-500">No sponsors available. (Data will be added in the future.)</p>
        ) : (
          sponsors.map((sponsor) => (
            <div key={sponsor.id} className="mb-4 border-b pb-4">
              <h3 className="text-xl font-semibold">{sponsor.name}</h3>
              <p className="text-gray-700">{sponsor.description}</p>
              <p className="text-gray-500 italic">Offers: {sponsor.items}</p>
            </div>
          ))
        )}
      </div>
    );
  }