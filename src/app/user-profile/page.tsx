"use client";
import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { countries } from "@/utils/countryData";
import withAuth from "@/utils/session";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from "next-themes";

const UserProfile = () => {
  const { data: session } = useSession();
  const [states, setStates] = useState([] as {
    name: string;
    cities: string[];
}[]); 
const [cities, setCities] = useState([] as string[]); 
  const [imageSrc, setImageSrc] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState();
  const [address, setAddress] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [state, setUserState] = useState();
  const [phone_number, setPhone_number] = useState();
  const [editMode, setEditMode] = useState(false);
  const darkModeClass = 'text-white';
  const lightModeClass = 'text-black';
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  // Conditionally set the text color class based on the current theme
  const textColorClass = currentTheme === 'dark' ? darkModeClass : lightModeClass;
  const handleFileChange = (event:any) => {
    const file = event?.target?.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        let renString:any = reader?.result;
        const base64String = renString.split(",")[1];
        setImageSrc(base64String);
   
      };

      // Read the image file as a data URL
      reader.readAsDataURL(file);
    }
  };
  const mystyle = {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "flex-start",
    padding: "20px",
    height: "100%",
   
  };

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };
  const handleRemovePhoto = () => {
    let user:any = session?.user?.email
    // Remove image from local storage
    localStorage.removeItem(user);

    // Clear image from component state
    setImageSrc("");
    toast.success('Rmoved Photo successfully!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleCountrySelect = (e:any) => {
    setCountry(e.target.value);
    const selectedCountry = countries?.find(
      (ctr) => ctr.name === e.target.value
    );
    const selectedStates = selectedCountry?.states;
    if (selectedStates !== undefined) {
      setStates(selectedStates);}
  };

  const handleStateSelect = (e:any) => {
    setUserState(e.target.value);
    const selectedState = states?.find((ctr) => ctr?.name === e.target.value);
    const selectedCity = selectedState?.cities;
    if (selectedCity !== undefined) {
      setCities(selectedCity);
      };
  };

  useEffect(() => {
    let key = session?.user?.email + "data";
    let userImg = session?.user?.email;
    const storedImage = localStorage.getItem(userImg || "");
    const data:any = localStorage.getItem(key);
    let userData = JSON.parse(data);
    if (data) {
      setEmail(userData.email);
      setBio(userData.bio);
      setAddress(userData.address);
      setCity(userData.city);
      setCountry(userData.country);
      setPhone_number(userData.phone_number);
      setCountry(userData.country);
      setUserState(userData.state);
    }
    if (storedImage) {
      setImageSrc(storedImage);
      handleFileChange(storedImage);
    }
  }, [session]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const bio = e.target.bio.value;
    const phone_number = e.target.phone_number.value;
    const address = e.target.address.value;
    const country = e.target.country.value;
    const city = e.target.city.value;
    const state = e.target.state.value;
    const userData = {
      email: email,
      bio: bio,
      phone_number: phone_number,
      address: address,
      country: country,
      city: city,
      state: state,
    };
    let key = email + "data";

    localStorage.setItem(key, JSON.stringify(userData));
    if (imageSrc) {
      localStorage.setItem(email, imageSrc);

    }
    setEditMode(false);
    toast.success('User Updated successfully!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  };
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  return (
    <section className="bg-none">
       <ToastContainer />
      <div
        className="flex flex-col items-center justify-center bg-none"
        style={mystyle}
      >
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white pt-2.5"
        >
          <img className="w-8 h-8 mr-2" src="/images/update.png" alt="logo" />
          <span className={textColorClass}>User Profile</span>  
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 bg-gray-10">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              <button
                onClick={handleEditClick}
                className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {editMode ? "Cancel Edit" : "Edit"}
              </button>
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={(e: any) => setEmail(e.target.value)}
                  required
                  disabled={!editMode}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload file
                </label>
                <div className="flex justify-center items-center py-4">
                  {imageSrc && (
                    <img
                      className="rounded w-36 h-36"
                      src={`data:image/png;base64,${imageSrc}`}
                      alt="Uploaded"
                      width={200}
                    />
                  )}
                </div>
              
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}

                />
                
              </div>
              <div>
              <button
                  onClick={handleRemovePhoto}
                  className="w-30 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-full font-medium text-sm px-5 py-2.5 text-center"
                >
                  Remove photo
                </button>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your phone no.
                </label>
                <input
                  type="number"
                  name="phone_number"
                  id="phone_number"
                  value={phone_number}
                  onChange={(e: any) => setPhone_number(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1234567890"
                  required
                  disabled={!editMode}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  value={bio}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="abc"
                  onChange={(e: any) => setBio(e.target.value)}
                  required
                  disabled={!editMode}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="street"
                  onChange={(e: any) => setAddress(e.target.value)}
                  required
                  disabled={!editMode}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select your country
                </label>
                <select
                  id="country"
                  name="country"
                  value={country}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleCountrySelect}
                  disabled={!editMode}
                >
                  <option disabled selected>
                    Select your option
                  </option>
                  {countries?.map((ctr) => (
                    <option  key={ctr.name} value={ctr.name}>
                      {ctr.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {!editMode ? (
                  <>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your city
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={state}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="street"
                      required
                      disabled={true}
                    />
                  </>
                ) : (
                  <>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Select your State
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={state}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={handleStateSelect}
                    >
                      <option disabled selected>
                        Select your option
                      </option>
                      {states?.map((ctr: any) => (
                        <option key={ctr.name} value={ctr.name}>
                          {ctr.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>

              <div>
                {!editMode ? (
                  <>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your city
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={city}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="street"
                      required
                      disabled={true}
                    />
                  </>
                ) : (
                  <>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Select your City
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={city}
                      onChange={(e: any) => setCity(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled selected>
                        Select your option
                      </option>
                      {cities &&
                        Array.isArray(cities) &&
                        cities.map((ctr) => (
                          <option key={ctr} value={ctr}>
                            {ctr}
                          </option>
                        ))}
                    </select>
                  </>
                )}
              </div>
           

              <button
                type="submit"
                className={`w-full text-white ${
                  editMode
                    ? "bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
                    : "bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
                } font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                {editMode ? "Save Changes" : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withAuth(UserProfile);
