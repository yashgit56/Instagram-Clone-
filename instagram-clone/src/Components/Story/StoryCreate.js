import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import 'tailwindcss/tailwind.css';
import { uploadToCloudinary } from '../../Config/UploadToCloudinary';
import { useDispatch } from 'react-redux';
import { createUserStory } from '../../Redux/Story/Action';

const validationSchema = Yup.object({
  image: Yup.mixed().required('An image file is required'),
  caption: Yup.string().required('Caption is required'),
});

const StoryCreate = () => {

    const token = localStorage.getItem("token") ;
    const dispatch = useDispatch() ;

  const initialValues = {
    image: null,
    caption: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const selectedImage = await uploadToCloudinary(values.image);
    const data = {
        jwt: token,
        data: {
            image: selectedImage,
            caption: values.caption
        }
    };
    dispatch(createUserStory(data)) ;
    setSubmitting(false);
    resetForm();
  };

  const handleFileChange = (event, setFieldValue) => {
    setFieldValue('image', event.currentTarget.files[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white p-12 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Create Your Story</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-8">
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-2" />
              </div>

              <div>
                <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <Field
                  id="caption"
                  name="caption"
                  as="textarea"
                  className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows="6"
                  placeholder="Write a caption..."
                />
                <ErrorMessage name="caption" component="div" className="text-red-500 text-sm mt-2" />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
                >
                  Add to Story
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StoryCreate;
