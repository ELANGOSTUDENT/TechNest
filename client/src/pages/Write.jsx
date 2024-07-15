import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title ||'');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : '',
          })
        : axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : '',
            date: moment(Date.now()).format('YYY-MM-DD HH:mm:ss'),
          });

      // Show success message using react-toastify
      toast.success('Blog added successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='addPost'>
      <div className='content'>
        <input
          type='text'
          value={title}
          placeholder='title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className='editorContainer'>
          <ReactQuill
            className='editor'
            theme='snow'
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <br></br>
          <span>
            <b>Visibility: </b> Public
          </span>
          <br></br>
          <input
            style={{ display: 'none' }}
            type='file'
            id='file'
            name=''
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className='file' htmlFor='file'>
            Upload image
          </label>
          <div className='buttons'>
            <button>Save as a draft</button>
            <br></br>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <input type='radio' checked={cat === "CodeCanvas"} name='CodeCanvas' value="CodeCanvas" id="CodeCanvas" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='CodeCanvas'>CodeCanvas</label>
          <br></br>
          <input type='radio' checked={cat === "TechSphere "} name='TechSphere ' value="TechSphere " id="TechSphere " onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='TechSphere '>TechSphere </label>
          <br></br>
          <input type='radio' checked={cat === "GadJet"} name='GadJet' value="GadJet" id="GadJet" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='GadJet'>GadJet</label>
          <br></br>
          <input type='radio' checked={cat === "XPlore "} name='XPlore ' value="XPlore " id="XPlore " onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='XPlore '>XPlore </label>
        </div>
      </div>
    </div>
  );
};

export default Write;
