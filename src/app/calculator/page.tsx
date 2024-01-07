// components/PersonalityCalculator.js
'use client';
import React, { useState } from 'react';

const PersonalityCalculator = () => {
  const [subjectMarks, setSubjectMarks] = useState({
    subject1: 0,
    subject2: 0,
    subject3: 0,
    subject4: 0,
  });

  const [result, setResult] = useState({
    grade: '',
    personalityTrait: '',
  });

  const handleInputChange = (subject: any, value: any) => {
    setSubjectMarks((prevMarks) => ({
      ...prevMarks,
      [subject]: value,
    }));
  };

  const calculateResult = async () => {
    try {
        console.log(subjectMarks);
        console.log(typeof subjectMarks);
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subjectMarks),
      });

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error('Error calculating result:', error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-transparent to-white via-white min-h-screen py-12">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-black">Personality Calculator</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Subject 1:</label>
          <input
            type="number"
            value={subjectMarks.subject1}
            onChange={(e) => handleInputChange('subject1', parseInt(e.target.value))}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Subject 2:</label>
          <input
            type="number"
            value={subjectMarks.subject2}
            onChange={(e) => handleInputChange('subject2', parseInt(e.target.value))}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Subject 3:</label>
          <input
            type="number"
            value={subjectMarks.subject3}
            onChange={(e) => handleInputChange('subject3', parseInt(e.target.value))}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Subject 4:</label>
          <input
            type="number"
            value={subjectMarks.subject4}
            onChange={(e) => handleInputChange('subject4', parseInt(e.target.value))}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
        <button
          onClick={calculateResult}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Calculate Result
        </button>

        {/* Display the result in the same component */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2 text-black">Result</h2>
          <table className="w-full border-collapse border border-gray-300 bg-transparent">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Grade</th>
                <th className="py-2 px-4 border">Personality Trait</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border">{result.grade}</td>
                <td className="py-2 px-4 border">{result.personalityTrait}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonalityCalculator;
