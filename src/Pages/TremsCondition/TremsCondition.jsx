import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Link } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useGetTernsConditionQuery } from '../../redux/api/settingApi';
const TremsCondition = () => {
  const {data : getTermsCondition} = useGetTernsConditionQuery()
  console.log(getTermsCondition?.data[0]?.content);
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [isLoading, seLoading] = useState(false)
  const handleTerms = () => {
      console.log(content)
  }
  const config = {
      readonly: false,
      placeholder: 'Start typings...',
      style: {
          height: 600,
      },
      buttons: [
          'image', 'fontsize', 'bold', 'italic', 'underline', '|',
          'font', 'brush',
          'align'
      ]
  }

  useEffect(()=>{
    setContent(getTermsCondition?.data[0]?.content)
  }, [getTermsCondition])
  return (
    <>
      <div className='flex justify-start items-center gap-2 mb-3 relative m-5'>
        <div className='absolute top-6 left-2 flex items-center'>
          <Link to={-1} className='py-1 px-2 rounded-md flex justify-start items-center gap-1  '><IoArrowBackSharp className='text-[var(--primary-color)]' /></Link> <p className='font-semibold'>Terms & Conditions</p>
        </div>
      </div>

      <div className="custom-jodit-editor mx-5 ">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={newContent => setContent(newContent)}
          onChange={newContent => { }}
        />
        <div className='flex items-center   justify-center mt-5'>
          <button className='bg-[var(--secondary-color)]  text-white px-4 py-2 rounded-full test'>Save Changes</button>
        </div>

      </div>
    </>
  )
}

export default TremsCondition