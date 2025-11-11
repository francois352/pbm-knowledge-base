'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface ConsultationForm {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

export default function ConsultationRequest() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationForm>();

  const onSubmit = async (data: ConsultationForm) => {
    try {
      // In a real app, this would call the API
      console.log('Form data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Thank You!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            We've received your consultation request. Our team will contact you within 24-48 hours.
          </p>
          <a href="/" className="btn-primary inline-block">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Request a Consultation
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Interested in photobiomodulation or neurofeedback? Fill out the form below and we'll
              be in touch.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="input"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="input"
                  type="email"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  className="input"
                  type="tel"
                  placeholder="+352 123 456 789"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  I'm interested in *
                </label>
                <select {...register('interest', { required: true })} className="input">
                  <option value="">Select an option</option>
                  <option value="neurofeedback">Neurofeedback Therapy</option>
                  <option value="pbm_therapy">PBM Therapy</option>
                  <option value="vielight_devices">Vielight Devices</option>
                  <option value="wellness_program">Wellness Program</option>
                  <option value="qeeg_assessment">QEEG Assessment</option>
                  <option value="other">Other</option>
                </select>
                {errors.interest && (
                  <p className="mt-1 text-sm text-red-600">Please select an option</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="input"
                  placeholder="Tell us about your goals and any questions you have..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </div>

          {/* Right Column - Info */}
          <div className="lg:pl-8">
            <div className="card mb-8">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Product Packages
              </h2>

              <div className="space-y-6">
                <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Pack Autonomie
                  </h3>
                  <div className="text-3xl font-bold text-primary-600 mb-4">€3,700</div>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>✓ Vielight Neuro Duo 4</li>
                    <li>✓ Vielight Vagus</li>
                    <li>✓ Complete user guide (FR/EN)</li>
                  </ul>
                </div>

                <div className="p-4 border-2 border-primary-600 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <div className="inline-block px-2 py-1 bg-primary-600 text-white text-xs rounded mb-2">
                    RECOMMENDED
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Pack Guidé
                  </h3>
                  <div className="text-3xl font-bold text-primary-600 mb-4">€4,000</div>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>✓ Everything in Pack Autonomie</li>
                    <li>✓ 2 hours personalized training</li>
                    <li>✓ Custom protocol development</li>
                    <li>✓ QEEG brain mapping integration</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Location</div>
                    <div className="text-gray-600 dark:text-gray-300">Luxembourg</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Email</div>
                    <div className="text-gray-600 dark:text-gray-300">
                      contact@neurofeedback-luxembourg.com
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Phone</div>
                    <div className="text-gray-600 dark:text-gray-300">Available upon request</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>2,500+ QEEG brain maps analyzed</strong> - Trust our expertise in
                  neurofeedback and photobiomodulation therapy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
