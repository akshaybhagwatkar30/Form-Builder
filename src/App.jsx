import React, { useState } from "react";

const DynamicForm = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState(initializeFormData(schema));

  function initializeFormData(schema) {
    let initialData = {};
    schema.forEach((field) => {
      if (field.type === "section") {
        initialData[field.name] = initializeFormData(field.fields);
      } else {
        initialData[field.name] = field.type === "checkbox" ? false : "";
      }
    });
    return initialData;
  }

  const handleChange = (e, fieldName, fieldType, parentPath = []) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let newState = { ...prev };
      let ref = newState;

      for (let key of parentPath) {
        ref = ref[key];
      }

      ref[fieldName] = fieldType === "checkbox" ? checked : value;
      return { ...newState };
    });
  };

  const renderFields = (fields, parentPath = []) => {
    return fields.map((field) => {
      if (field.type === "section") {
        return (
          <div key={field.name} className="p-5 border border-gray-300 rounded-lg bg-white shadow-md mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{field.label}</h3>
            {renderFields(field.fields, [...parentPath, field.name])}
          </div>
        );
      }

      return (
        <div key={field.name} className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">{field.label}</label>
          {field.type === "text" || field.type === "email" ? (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={(e) => handleChange(e, field.name, field.type, parentPath)}
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
              required={field.required}
            />
          ) : field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={(e) => handleChange(e, field.name, field.type, parentPath)}
              className="border rounded-lg p-2 w-full bg-white"
            >
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            <div className="flex items-center">
              <input
                type="checkbox"
                name={field.name}
                checked={formData[field.name]}
                onChange={(e) => handleChange(e, field.name, field.type, parentPath)}
                className="mr-2"
              />
              <span className="text-gray-700">{field.label}</span>
            </div>
          ) : null}
        </div>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      {renderFields(schema)}
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 w-full">
        Submit
      </button>
    </form>
  );
};

const App = () => {
  const formSchema = [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
    {
      name: "education",
      label: "Education",
      type: "section",
      fields: [
        { name: "degree", label: "Degree", type: "text" },
        { name: "university", label: "University", type: "text" },
      ],
    },
    {
      name: "workExperience",
      label: "Work Experience",
      type: "section",
      fields: [
        { name: "company", label: "Company", type: "text" },
        { name: "role", label: "Role", type: "text" },
      ],
    },
    { name: "subscribe", label: "Subscribe to Newsletter", type: "checkbox" },
  ];

  const [submittedData, setSubmittedData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Dynamic Form Builder</h1>
      <DynamicForm schema={formSchema} onSubmit={setSubmittedData} />
      {submittedData && (
        <div className="max-w-lg mx-auto mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Submitted Data:</h2>
          <pre className="bg-gray-200 p-3 mt-2 rounded-lg">{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
