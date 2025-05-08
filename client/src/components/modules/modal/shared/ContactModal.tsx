import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline'; 

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  desiredPeriod: string;
  email?: string;
  message?: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const callPeriods = ['8-10', '10-12', '12-14', '14-16']; 

const ContactModal: FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log('Form data submitted:', data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert('Callback request submitted successfully!');
      reset();
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your request. Please try again later.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 transition-opacity duration-300 overflow-y-auto">
<div className="bg-white rounded-md shadow-lg w-full max-w-lg">

        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold mb-4 text-blue-900">We are pleased that you would like to contact us</h2>
          <p className="text-gray-700 mb-4">
            We're available weekdays from 8:00 a.m. to 4:00 p.m. Or leave your details to be contacted by one of our experts.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                  YOUR FIRST NAME *
                </label>
                <input
                  type="text"
                  id="firstName"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.firstName ? 'border-red-500' : ''
                  }`}
                  {...register('firstName', { required: 'First name is required' })}
                />
                {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                  YOUR LAST NAME *
                </label>
                <input
                  type="text"
                  id="lastName"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.lastName ? 'border-red-500' : ''
                  }`}
                  {...register('lastName', { required: 'Last name is required' })}
                />
                {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                  YOUR PHONE NUMBER *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.phoneNumber ? 'border-red-500' : ''
                  }`}
                  placeholder="e.g., +49 176 123456789"
                  {...register('phoneNumber', { required: 'Phone number is required' })}
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber.message}</p>}
              </div>
              <div>
                <label htmlFor="desiredPeriod" className="block text-gray-700 text-sm font-bold mb-2">
                  YOUR DESIRED PERIOD *
                </label>
                <select
                  id="desiredPeriod"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.desiredPeriod ? 'border-red-500' : ''
                  }`}
                  {...register('desiredPeriod', { required: 'Please select a desired period' })}
                >
                  <option value="" disabled>Select a period</option>
                  {callPeriods.map((period) => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
                {errors.desiredPeriod && <p className="text-red-500 text-xs italic">{errors.desiredPeriod.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                YOUR EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email ? 'border-red-500' : ''
                }`}
                {...register('email')}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email?.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                MESSAGE
                <span className="text-gray-500 ml-1">(optional)</span>
              </label>
              <textarea
                id="message"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                {...register('message')}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-yellow-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white border-opacity-50"></div>
                ) : (
                  'Request a callback'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;