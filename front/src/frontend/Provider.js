import React, { useState, useEffect } from "react";
import "./Provider.css";
import { useNavigate } from "react-router-dom";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Provider() {
  const navigate = useNavigate();

  const [services] = useState([
    { id: 1, service_type: "Math" },
    { id: 2, service_type: "English" },
    { id: 3, service_type: "Science" },
    { id: 4, service_type: "History" },
    { id: 5, service_type: "Foreign Language" },
  ]);

  const [classTypes, setClassTypes] = useState([]);

  // Addresses dropdown
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(""); // store address id as string

  // Class creation fields
  const [selectedService, setSelectedService] = useState("");
  const [selectedClassType, setSelectedClassType] = useState("");
  const [selectedClassName, setSelectedClassName] = useState("");
  const [classCost, setClassCost] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Address creation fields (NEW)
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const baseURLRaw = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";
  const baseURL = baseURLRaw.endsWith("/") ? baseURLRaw : `${baseURLRaw}/`;

  const loadAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${baseURL}api/providers/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setAddresses(data.data || []);
      } else {
        console.error("Failed to load addresses:", data);
        setAddresses([]);
      }
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
      setAddresses([]);
    }
  };

  useEffect(() => {
    loadAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseURL]);

  useEffect(() => {
    const types = {
      Math: ["Calc 1", "Calc 2", "Calc 3", "Linear Algebra"],
      English: ["English 101", "Literature", "English 102", "English 102"],
      Science: ["Chemistry", "Biology", "Physics", "Astronomy"],
      History: ["American History", "Modern Europe", "Ancient Civilizations", "Governent"],
      "Foreign Language": ["Chinese", "Spanish", "Latin", "French"],
    };
    setClassTypes(types[selectedService] || []);
  }, [selectedService]);

  const handleCreateAddress = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token not found. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${baseURL}api/providers/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          addressOne,
          addressTwo,
          city,
          state,
          zip,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create address");
        return;
      }

      // refresh dropdown + auto-select the newly created addressId
      await loadAddresses();
      if (data.addressId) setSelectedAddress(String(data.addressId));

      // reset form
      setAddressOne("");
      setAddressTwo("");
      setCity("");
      setState("");
      setZip("");
      setShowAddressForm(false);

      alert(`Address created! ID: ${data.addressId}`);
    } catch (err) {
      console.error("Create address failed:", err);
      alert("Network error creating address");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token not found. Please log in.");
      return;
    }

    if (!selectedAddress) {
      alert("Please select an Address.");
      return;
    }

    // date is already YYYY-MM-DD from <input type="date">
    const formattedStartTime = `${date} ${startTime}:00`;
    const formattedEndTime = `${date} ${endTime}:00`;

    try {
      const response = await fetch(`${baseURL}api/providers/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceType: selectedService,
          classType: selectedClassType,
          addressId: Number(selectedAddress),
          className: selectedClassName,
          cost: classCost,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Class created successfully: " + data.classId);
        navigate("/C");
      } else {
        alert(data.message || "Failed to create class");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error, unable to create class");
    }
  };

  return (
    <div className="provider-page">
      {/* Navbar fixed only */}
      <header className="navbarContainer home-navbar-interactive provider-navbar">
        <span className="logo">Tutor Scheduler Pro</span>
        <div className="home-desktop-menu">
          <nav className="home-links">
            <span className="home-nav" onClick={() => navigate("/Class")}>
              Home
            </span>
            <span className="home-nav bodySmall" onClick={() => navigate("/tutor")}>
              About Us
            </span>
            <span className="home-nav" onClick={() => navigate("/provider")}>
              Create Class
            </span>
            <a
              href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="home-nav">Contact Us</span>
            </a>
          </nav>
          <button className="home-login buttonFlat" onClick={() => navigate("/entry")}>
            Logout
          </button>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="provider-content">
        <div className="New_Class">
          <h1 className="create-class-header">Create a Class</h1>

          <form onSubmit={handleSubmit}>
            <label>
              Subjects:
              <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required>
                <option value="">Select a Subject</option>
                {services.map((service) => (
                  <option key={service.id} value={service.service_type}>
                    {service.service_type}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Class Type:
              <select value={selectedClassType} onChange={(e) => setSelectedClassType(e.target.value)} required>
                <option value="">Select a Class Type</option>
                {classTypes.map((ct) => (
                  <option key={ct} value={ct}>
                    {ct}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Course ID:
              <input
                type="text"
                value={selectedClassName}
                onChange={(e) => setSelectedClassName(e.target.value)}
                placeholder="Enter Class Name"
                required
              />
            </label>

            <label>
              Class Cost:
              <input
                type="number"
                step="0.01"
                value={classCost}
                onChange={(e) => setClassCost(e.target.value)}
                placeholder="Enter Class Cost"
                required
              />
            </label>

            <label>
              Address:
              <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)} required>
                <option value="">Select an address</option>
                {addresses.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.id} — {a.address_one}, {a.city}, {a.state} {a.zipcode}
                  </option>
                ))}
              </select>
            </label>

            <div className="address-row">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setShowAddressForm((v) => !v)}
              >
                {showAddressForm ? "Cancel Address" : "Add New Address"}
              </button>
            </div>

            {addresses.length === 0 && !showAddressForm && (
              <p className="hint-text">No addresses found. Click “Add New Address” to create one.</p>
            )}

            {showAddressForm && (
              <div className="address-form">
                <h3 className="address-title">Create Address</h3>

                <label>
                  Address One:
                  <input value={addressOne} onChange={(e) => setAddressOne(e.target.value)} required />
                </label>

                <label>
                  Address Two:
                  <input value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} />
                </label>

                <label>
                  City:
                  <input value={city} onChange={(e) => setCity(e.target.value)} required />
                </label>

                <label>
                  State:
                  <input value={state} onChange={(e) => setState(e.target.value)} required />
                </label>

                <label>
                  Zip:
                  <input value={zip} onChange={(e) => setZip(e.target.value)} required />
                </label>

                <div className="container">
                  <button type="button" onClick={handleCreateAddress}>
                    Save Address
                  </button>
                </div>
              </div>
            )}

            <label>
              Date:
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>

            <label>
              Start Time:
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </label>

            <label>
              End Time:
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </label>

            <div className="container">
              <button type="submit">Create Class</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Provider;