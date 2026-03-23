import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/instance";

export const useCreateCustomer = () => {
  const router = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    customerType: "Current",
    photo: null,
    photoPreview: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      photo: file,
      photoPreview: URL.createObjectURL(file),
    }));
  }

  function handleCustomerType(type) {
    setFormData((prev) => ({ ...prev, customerType: type }));
  }

  function validate() {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    // if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const userInput = {
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };

    try {
      const res = await axiosInstance.post("/crm/customers", userInput);
      console.log("Customer created:", res.data);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          customerType: "Current",
          // photo: null,
          // photoPreview: null,
        });
        router("/admin/crm/customers");
      }, 1500);
    } catch (error) {
      console.error("Error creating customer:", error);
      console.log(error);
      
      setErrors({
        submit: error.response?.data?.message || "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return {
    formData,
    loading,
    errors,
    success,
    handleChange,
    handlePhotoChange,
    handleCustomerType,
    handleSubmit,
  };
};