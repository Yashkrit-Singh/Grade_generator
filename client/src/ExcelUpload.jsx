import React, { useState } from 'react';
import axios from 'axios';
import './ExcelUpload.css';

const ExcelUpload = () => {
  const [fileData, setFileData] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      localStorage.setItem('excelData', JSON.stringify(response.data));
      setFileData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="excel-upload-container">
      <label className="file-upload-label">
        Choose File
        <input type="file" onChange={handleFileUpload} />
      </label>

      <table border="1">
        <thead>
          <tr>
            {fileData.length > 0 && Object.keys(fileData[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fileData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelUpload;
