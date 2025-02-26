// Application Form Page

"use client";
import {useEffect, useState} from "react";

export default function ApplicationForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const [policies, setPolicies] = useState([]);  // creating const for policies featch from backend
    const [agreements, setAgreements] = useState({});  // creating const for checkboxes
    const [sponsorId, setSponsorId] = useState("");  // creating const for sponsor ID for retreival
    const [sponsors, setSponsors] = useState([]);  // creating const for sponsors for retreival
    const [errors, setErrors] = useState({});  // creating const for errors

    // fetch available sponsor from backend db
    useEffect(() => {
        async function fetchSponsors() {
            try {
                const response = await fetch("https://se1j4axgel.execute-api.us-east-1.amazonaws.com/Team24/sponsors"); // INSERT DB LINK HERE
                const data = await response.json();
                setSponsors(data);
            }
            catch (error) {
                console.error("Error fetching sponsors:", error);
            } 
        }
        fetchSponsors();
    }, []);


    // fetch policies once sponsor is selected from dropdown
    useEffect(() => {
        if(!sponsorId) return; // if no sponsor is selected
        async function fetchPolicies() {
            try {
                const response = await fetch(); // INSERT DB LINK HERE
                const data = await response.json
                setPolicies(data);
                setAgreements(data.reduce((acc, policy) => ({...acc, [policy.policy_id]: false }), {}))
            } catch (error) {
                console.error("Error fetching policies:", error);
            }
        }
        fetchPolicies();
    }, [sponsorId]);


    // handle the sponsor change
    const handleSponsorChange = (e) => {
        setSponsorId(e.target.value);

        // store sponsor choice in dropdown locally
        // holds in case user refreshes page or comes back to application later
        localStorage.setItem("selectedSponsor", e.target.value); 
    }

    // handle the agreement change
    const handleAgreementChange = (e) => {
        setAgreements((prev) => ({
            ...prev,
            [policyId]: !prev[policyId]
        }));
    }


    const validateForm = () => {
        let newErrors = {};
        if(!formData.firstName.trim()) newErrors.firstName = "First name is required.";
        if(!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
        if(!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Valid email is required.";
        if(!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
            newErrors.phone = "Valid phone number is required.";
        if (!sponsorId) newErrors.sponsorId = "Please select a sponsor.";
        if(policies.length > 0 && !Object.values(agreements).every(Boolean))
            newErrors.agreements = "You must agree to all policies";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.PreventDefault();
        if (validateForm()) {
            console.log("Form submitted.", formData);
            //TO DO: send data to database
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // webpage
    return (
        <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-black">Application Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Sponsor Drop Down */}
            <div>
                <label className="block text-sm font-medium text-black">Select Sponsor</label>
                <select value={sponsorId} onChange={handleSponsorChange} className="mt-1 p-2 w-full border rounder-md text-black">
                    <option value="">-- Choose a Sponsor --</option>
                    {sponsors.map((sponsor) => (
                        <option key={sponsor.id} value={sponsor.id}>{sponsor.name}</option>
                    ))}
                </select>
                {errors.sponsorId && <p className="text-red-500 text-sm">{errors.sponsorId}</p>}
            </div>

            {/* User Input Fields */}
            {["firstName", "lastName", "email", "phone"].map((field) => (
            <div key={field}>
                <label className="block text-sm font-medium capitalize text-black">{field.replace(/([A-Z])/g, " $1")}</label>
                <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md text-black"
                />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
            ))}

            {/* Sponsor Policies */}
            {sponsorId && policies.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mt-4 text-black">Sponsor Policies</h3>
                    {policies.map((policy) => (
                        <div key={policy.policy_id} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={agreements[policy.policy_id] || false}
                                onChange={() => handleAgreementChange(policy.policy_id)}
                                className="mr-2"
                            />
                            <label className="text-black">{policy.policy_text}</label>
                        </div>
                    ))}
                    {errors.agreements && <p className="text-red-500 text-sm">{errors.agreements}</p>}
                </div>
            )}

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit
            </button>
        </form>
        </div>
    );
}
