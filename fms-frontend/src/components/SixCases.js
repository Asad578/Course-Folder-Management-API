import React from 'react'
import './SixCases.css';
import { Link } from 'react-router-dom';

export default function SixCases() {
    let tileItems = []

    tileItems = (
        <>
            <div className='tile-item-sc'>
            <Link to='/casecontent'><div className='tile-clr-sc'>Question</div></Link>
            </div>
            <div className='tile-item-sc'>
            <Link to='/casecontent'><div className='tile-clr-sc'>Solution</div></Link>
            </div>
            <div className='tile-item-sc'>
            <Link to='/casecontent'><div className='tile-clr-sc'>Best</div></Link>
            </div>
            <div className='tile-item-sc'>
            <Link to='/casecontent'><div className='tile-clr-sc'>Average</div></Link>
            </div>
            <div className='tile-item-sc'>
            <Link to='/casecontent'><div className='tile-clr-sc'>Worst</div></Link>
            </div>
            <div className='tile-item-sc'>
            <Link to='/casecontent'><div className='tile-clr-sc'>Marks Sheet</div></Link>
            </div>
            
            
        </>

    );

  return (
    <>
    <div className='tile-list-sc'>
        {tileItems}

    </div>
      
    </>
  )
}
