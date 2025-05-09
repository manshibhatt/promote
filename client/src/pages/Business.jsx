import React, { useReducer } from 'react';
import newRequest from '../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const initialState = {
  name: '',
  description: '',
  address: '',
  category: '',
  city: '',
  state: '',
  phone: '',
};





const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

export default function VerifyBusiness() {
  const [formData, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Submitted Business Info:", formData);
    try{
        console.log(formData)
        const res= await newRequest.post("/business/",formData)
        // console.log(res)
        navigate(`/profile/${currentuser?._id}`);
      }catch(err){
        console.log(err);
      }
    
    dispatch({ type: 'RESET_FORM' }); // Optional: reset form after submit
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Verify Your Business
        </h2>

        {Object.entries(formData).map(([field, value]) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={value}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        ))}

        <button
          type="submit"
          className="w-full bg-[#004d38] text-white py-2 rounded hover:opacity-90"
        >
          Submit for Verification
        </button>
      </form>
    </div>
  );
}
